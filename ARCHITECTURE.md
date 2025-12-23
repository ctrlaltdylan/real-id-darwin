# Architecture

A client dashboard for ID verification, built for merchants outside Shopify, WooCommerce, and BigCommerce.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 11 (PHP 8.2+) |
| Frontend | React 19 + TypeScript |
| Bridge | Inertia.js |
| Build | Vite 5 |
| Styling | Tailwind CSS |
| UI | Headless UI, Heroicons |
| Auth | Laravel Sanctum |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   React Components                       │ │
│  │         (Dashboard, CheckDetails, Settings)              │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │ Inertia Router
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Laravel Controllers                       │
│           (ChecksController, ShopController)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │ $shop->api()
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                       Core API                               │
│              (REAL_ID_API_HOST env var)                      │
│         All ID verification logic lives here                 │
└─────────────────────────────────────────────────────────────┘
```

This app is a **UI layer** around the Core API. It handles:
- User/shop authentication
- Fetching data via the shop's `api_key`
- Rendering the dashboard interface

---

## Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── ChecksController.php    # Check CRUD, approval/rejection
│   │   │   ├── ShopController.php      # Shop settings, switching
│   │   │   └── DevelopersController.php
│   │   └── Middleware/
│   │       ├── CurrentShopMiddleware.php   # Sets shop context
│   │       └── HandleInertiaRequests.php   # Shares auth props
│   └── Models/
│       ├── Shop.php    # API client creation, shop data
│       └── User.php    # User with multi-shop support
├── resources/js/
│   ├── app.tsx         # React entry point
│   ├── Pages/
│   │   ├── Dashboard.tsx       # Main checks list
│   │   ├── CheckDetails.tsx    # Individual check view
│   │   ├── Settings.tsx        # Shop configuration
│   │   ├── Checkout.tsx        # Demo checkout page
│   │   └── Auth/               # Login, register, etc.
│   ├── Components/
│   │   ├── Checks/
│   │   │   └── Details/        # Check detail sub-components
│   │   ├── Contexts/           # ShopContext, ToastContext
│   │   └── Layouts/            # AuthenticatedLayout
│   └── Lib/
│       ├── helpers.tsx         # Utilities, error mappings
│       └── constants.tsx       # Status constants
└── routes/
    └── web.php         # Route definitions
```

---

## Core Concepts

### Multi-Shop Architecture

Users can belong to multiple shops (many-to-many relationship).

```php
// User model
public function shops(): BelongsToMany

// Shop model
public function users(): BelongsToMany
```

The current shop is stored in session and validated by `CurrentShopMiddleware`.

### API Integration

The `Shop` model creates an authenticated HTTP client:

```php
// app/Models/Shop.php
public function api(): PendingRequest
{
    return Http::withToken($this->api_key)
        ->baseUrl(config('services.realid.host'))
        ->withUserAgent('Verdict Dashboard/1.0');
}
```

Controllers use this to call the Core API:

```php
$response = $shop->api()->get('/api/checks', [
    'page' => $request->input('page', 1),
    'per_page' => 10,
]);
```

### State Management

**Server-driven** via Inertia props:
- `auth.user` - Current user
- `auth.currentShop` - Active shop
- `auth.shops` - All user's shops
- Page-specific data (checks, check details)

**Minimal client state**:
- `ShopContext` - Current shop reference
- `ToastContext` - Notification queue
- Component-local `useState` for UI

---

## Key Workflows

### Viewing Checks

1. User visits `/dashboard`
2. `ChecksController@index` fetches from Core API
3. Returns checks as Inertia props
4. `Dashboard.tsx` renders the list

### Manual Approval/Rejection

1. User clicks approve/reject in `CheckDetails.tsx`
2. Modal collects reason (for rejection)
3. `router.post` to `/checks/{id}/manually-approve` or `manually-reject`
4. Controller calls Core API endpoint
5. Page refreshes with updated status

### Shop Switching

1. User selects shop from dropdown
2. GET `/shop/{id}/switch`
3. `ShopController@switch` validates access, updates session
4. Redirects to dashboard

---

## Routes

| Method | Path | Controller | Purpose |
|--------|------|------------|---------|
| GET | `/dashboard` | ChecksController@index | List checks |
| GET | `/checks/{id}` | ChecksController@show | Check details |
| POST | `/checks/{id}/manually-approve` | ChecksController@manuallyApprove | Approve check |
| POST | `/checks/{id}/manually-reject` | ChecksController@manuallyReject | Reject check |
| POST | `/checks/{id}/delete-data` | ChecksController@deleteData | Delete photos |
| GET | `/settings` | ShopController@settings | Shop settings |
| GET | `/shop/{id}/switch` | ShopController@switch | Switch shop |
| GET | `/developers` | DevelopersController@index | API docs |
| GET | `/checkout` | Inertia::render | Demo page |

---

## Development

### Setup

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
```

### Environment Variables

```env
REAL_ID_API_HOST=https://your-core-api.com
DB_CONNECTION=sqlite
```

### Running Locally

```bash
# All services (Laravel, Vite, queue, logs)
composer dev

# Or individually
php artisan serve
npm run dev
```

### Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run lint     # ESLint fix
```

---

## Component Hierarchy

```
AuthenticatedLayout
├── Navigation
│   ├── Shop Dropdown (switch shops)
│   └── User Menu
└── Page Content
    └── CheckDetails (example)
        ├── PageHeading
        ├── Progress (step indicator)
        ├── Card
        │   ├── FinalCheckStatusBanner
        │   ├── Confidence
        │   ├── DocumentDetails
        │   ├── ImageViewer
        │   └── Signals
        ├── OrderDetails
        ├── BrowserDetails
        ├── EventsTimeline
        └── Modals
            ├── ManualApprovalModal
            └── ManualRejectionModal
```

---

## Check Status Flow

Checks progress through steps:

```
delivered → opened → id → face_match → completed/in_review
```

Simplified to three display states:
- `in_progress` - Check not complete
- `verified` - `job.result.success === true`
- `failed` - `job.result.success === false`

Error mappings in `resources/js/Lib/helpers.tsx` translate Core API errors to user-friendly messages.
