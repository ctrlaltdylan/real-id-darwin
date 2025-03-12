'use client';

import { Radio, RadioGroup } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const products = [
    {
        id: 1,
        title: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Black',
        size: 'Large',
        imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/checkout-page-02-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },
    // More products...
];
const deliveryMethods = [
    {
        id: 1,
        title: 'Standard',
        turnaround: '4–10 business days',
        price: '$5.00',
    },
    {
        id: 2,
        title: 'Express',
        turnaround: '2–5 business days',
        price: '$16.00',
    },
];
const paymentMethods = [
    { id: 'credit-card', title: 'Credit card' },
    { id: 'paypal', title: 'PayPal' },
    { id: 'etransfer', title: 'eTransfer' },
];

const defaultCheckoutData = {
    email: 'dylan@getverdict.com',
    firstName: 'Amy',
    lastName: 'Buckley',
    company: '',
    address: '31316 Lake St',
    apartment: '',
    city: 'Seattle',
    country: 'United States',
    region: 'WA',
    postalCode: '44107',
    phone: '330-614-4619',
};

export default function Checkout() {
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
        deliveryMethods[0],
    );

    const [email, setEmail] = useState(defaultCheckoutData.email);
    const [firstName, setFirstName] = useState(defaultCheckoutData.firstName);
    const [lastName, setLastName] = useState(defaultCheckoutData.lastName);
    const [company, setCompany] = useState(defaultCheckoutData.company);
    const [address, setAddress] = useState(defaultCheckoutData.address);
    const [apartment, setApartment] = useState(defaultCheckoutData.apartment);
    const [city, setCity] = useState(defaultCheckoutData.city);
    const [country, setCountry] = useState(defaultCheckoutData.country);
    const [region, setRegion] = useState(defaultCheckoutData.region);
    const [postalCode, setPostalCode] = useState(
        defaultCheckoutData.postalCode,
    );
    const [phone, setPhone] = useState(defaultCheckoutData.phone);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
        paymentMethods[0].id,
    );
    const [cardNumber, setCardNumber] = useState('1234567890123456');
    const [nameOnCard, setNameOnCard] = useState('Dylan Pierce');
    const [expirationDate, setExpirationDate] = useState('01/2026');
    const [cvc, setCvc] = useState('123');

    const populateDefaultData = () => {
        const fields = [
            { value: defaultCheckoutData.email, setter: setEmail },
            { value: defaultCheckoutData.firstName, setter: setFirstName },
            { value: defaultCheckoutData.lastName, setter: setLastName },
            { value: defaultCheckoutData.company, setter: setCompany },
            { value: defaultCheckoutData.address, setter: setAddress },
            { value: defaultCheckoutData.apartment, setter: setApartment },
            { value: defaultCheckoutData.city, setter: setCity },
            { value: defaultCheckoutData.country, setter: setCountry },
            { value: defaultCheckoutData.region, setter: setRegion },
            { value: defaultCheckoutData.postalCode, setter: setPostalCode },
            { value: defaultCheckoutData.phone, setter: setPhone },
        ];

        let currentFieldIndex = 0;
        let currentCharIndex = 0;

        const typeCharacter = () => {
            if (currentFieldIndex < fields.length) {
                const field = fields[currentFieldIndex];
                const value = field.value;
                const setter = field.setter;

                if (currentCharIndex < value.length) {
                    setter((prev) => (prev || '') + value[currentCharIndex]);
                    currentCharIndex++;
                    window.scrollTo(0, document.body.scrollHeight);
                    setTimeout(typeCharacter, 100);
                } else {
                    currentFieldIndex++;
                    currentCharIndex = 0;
                    setTimeout(typeCharacter, 100);
                }
            }
        };

        typeCharacter();
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event.metaKey, event.key);
            if (event.metaKey && event.key === 'k') {
                event.preventDefault();
                populateDefaultData();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission
        console.log({
            email,
            firstName,
            lastName,
            company,
            address,
            apartment,
            city,
            country,
            region,
            postalCode,
            phone,
            selectedDeliveryMethod,
            selectedPaymentMethod,
            cardNumber,
            nameOnCard,
            expirationDate,
            cvc,
        });
        axios
            .post('/api/checks/create', {
                shopName: 'pierces-pretzels.myshopify.com',
                // shopName: 'real-id-dev.myshopify.com',
                firstName,
                lastName,
                email,
                phone,
                orderId: '#1234567890',
                shopifyOrder: {
                    customer: {
                        first_name: firstName,
                        last_name: lastName,
                        email,
                        phone,
                    },
                    billing_address: {
                        address1: '1280 Winton Ave',
                        city: 'Cleveland',
                        province: 'OH',
                        postal_code: '44107',
                        country: 'US',
                    },
                    shipping_address: {
                        address1: address,
                        city,
                        province: region,
                        postal_code: postalCode,
                        country,
                    },
                },
            })
            .then((response) => {
                console.log(response);
                router.visit('/order-status', {
                    data: { checkId: response.data.check?.id },
                });
            });
    };

    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>

                <form
                    className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">
                                Contact information
                            </h2>

                            <div className="mt-4">
                                <label
                                    htmlFor="email-address"
                                    className="block text-sm/6 font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email-address"
                                        name="email-address"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-10">
                            <h2 className="text-lg font-medium text-gray-900">
                                Shipping information
                            </h2>

                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label
                                        htmlFor="first-name"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="first-name"
                                            name="first-name"
                                            type="text"
                                            autoComplete="given-name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="last-name"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="last-name"
                                            name="last-name"
                                            type="text"
                                            autoComplete="family-name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="company"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Company
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="company"
                                            name="company"
                                            type="text"
                                            value={company}
                                            onChange={(e) =>
                                                setCompany(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="address"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            autoComplete="street-address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="apartment"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Apartment, suite, etc.
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="apartment"
                                            name="apartment"
                                            type="text"
                                            value={apartment}
                                            onChange={(e) =>
                                                setApartment(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            autoComplete="address-level2"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="country"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Country
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="region"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="region"
                                            name="region"
                                            type="text"
                                            autoComplete="address-level1"
                                            value={region}
                                            onChange={(e) =>
                                                setRegion(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="postal-code"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="postal-code"
                                            name="postal-code"
                                            type="text"
                                            autoComplete="postal-code"
                                            value={postalCode}
                                            onChange={(e) =>
                                                setPostalCode(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Phone
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            autoComplete="tel"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-10">
                            <fieldset>
                                <legend className="text-lg font-medium text-gray-900">
                                    Delivery method
                                </legend>
                                <RadioGroup
                                    value={selectedDeliveryMethod}
                                    onChange={setSelectedDeliveryMethod}
                                    className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                                >
                                    {deliveryMethods.map((deliveryMethod) => (
                                        <Radio
                                            key={deliveryMethod.id}
                                            value={deliveryMethod}
                                            aria-label={deliveryMethod.title}
                                            aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                                            className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                                        >
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        {deliveryMethod.title}
                                                    </span>
                                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                                        {
                                                            deliveryMethod.turnaround
                                                        }
                                                    </span>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                                        {deliveryMethod.price}
                                                    </span>
                                                </span>
                                            </span>
                                            <CheckCircleIcon
                                                aria-hidden="true"
                                                className="size-5 text-indigo-600 group-[&:not([data-checked])]:hidden"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                            />
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </fieldset>
                        </div>

                        {/* Payment */}
                        <div className="mt-10 border-t border-gray-200 pt-10">
                            <h2 className="text-lg font-medium text-gray-900">
                                Payment
                            </h2>

                            <fieldset className="mt-4">
                                <legend className="sr-only">
                                    Payment type
                                </legend>
                                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                    {paymentMethods.map(
                                        (paymentMethod, paymentMethodIdx) => (
                                            <div
                                                key={paymentMethod.id}
                                                className="flex items-center"
                                            >
                                                <input
                                                    defaultChecked={
                                                        paymentMethodIdx === 0
                                                    }
                                                    id={paymentMethod.id}
                                                    name="payment-type"
                                                    type="radio"
                                                    value={paymentMethod.id}
                                                    checked={
                                                        selectedPaymentMethod ===
                                                        paymentMethod.id
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedPaymentMethod(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                                />
                                                <label
                                                    htmlFor={paymentMethod.id}
                                                    className="ml-3 block text-sm/6 font-medium text-gray-700"
                                                >
                                                    {paymentMethod.title}
                                                </label>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </fieldset>

                            <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                                <div className="col-span-4">
                                    <label
                                        htmlFor="card-number"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Card number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="card-number"
                                            name="card-number"
                                            type="text"
                                            autoComplete="cc-number"
                                            value={cardNumber}
                                            onChange={(e) =>
                                                setCardNumber(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-4">
                                    <label
                                        htmlFor="name-on-card"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Name on card
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="name-on-card"
                                            name="name-on-card"
                                            type="text"
                                            autoComplete="cc-name"
                                            value={nameOnCard}
                                            onChange={(e) =>
                                                setNameOnCard(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <label
                                        htmlFor="expiration-date"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        Expiration date (MM/YY)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="expiration-date"
                                            name="expiration-date"
                                            type="text"
                                            autoComplete="cc-exp"
                                            value={expirationDate}
                                            onChange={(e) =>
                                                setExpirationDate(
                                                    e.target.value,
                                                )
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="cvc"
                                        className="block text-sm/6 font-medium text-gray-700"
                                    >
                                        CVC
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="cvc"
                                            name="cvc"
                                            type="text"
                                            autoComplete="csc"
                                            value={cvc}
                                            onChange={(e) =>
                                                setCvc(e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                            <h3 className="sr-only">Items in your cart</h3>
                            <ul
                                role="list"
                                className="divide-y divide-gray-200"
                            >
                                {products.map((product) => (
                                    <li
                                        key={product.id}
                                        className="flex px-4 py-6 sm:px-6"
                                    >
                                        <div className="shrink-0">
                                            <img
                                                alt={product.imageAlt}
                                                src={product.imageSrc}
                                                className="w-20 rounded-md"
                                            />
                                        </div>

                                        <div className="ml-6 flex flex-1 flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm">
                                                        <a
                                                            href={product.href}
                                                            className="font-medium text-gray-700 hover:text-gray-800"
                                                        >
                                                            {product.title}
                                                        </a>
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {product.color}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {product.size}
                                                    </p>
                                                </div>

                                                <div className="ml-4 flow-root shrink-0">
                                                    <button
                                                        type="button"
                                                        className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">
                                                            Remove
                                                        </span>
                                                        <TrashIcon
                                                            aria-hidden="true"
                                                            className="size-5"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-1 items-end justify-between pt-2">
                                                <p className="mt-1 text-sm font-medium text-gray-900">
                                                    {product.price}
                                                </p>

                                                <div className="ml-4">
                                                    <div className="grid grid-cols-1">
                                                        <select
                                                            id="quantity"
                                                            name="quantity"
                                                            aria-label="Quantity"
                                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                        >
                                                            <option value={1}>
                                                                1
                                                            </option>
                                                            <option value={2}>
                                                                2
                                                            </option>
                                                            <option value={3}>
                                                                3
                                                            </option>
                                                            <option value={4}>
                                                                4
                                                            </option>
                                                            <option value={5}>
                                                                5
                                                            </option>
                                                            <option value={6}>
                                                                6
                                                            </option>
                                                            <option value={7}>
                                                                7
                                                            </option>
                                                            <option value={8}>
                                                                8
                                                            </option>
                                                        </select>
                                                        <ChevronDownIcon
                                                            aria-hidden="true"
                                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        $64.00
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Shipping</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        $5.00
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Taxes</dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        $5.52
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base font-medium">
                                        Total
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900">
                                        $75.52
                                    </dd>
                                </div>
                            </dl>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Confirm order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
