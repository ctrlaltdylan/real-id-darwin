import Card, { Section } from '@/Components/Card';
import SkeletonBodyText from '@/Components/SkeletonBodyText';
import SkeletonDisplayText from '@/Components/SkeletonDisplayText';
import Text from '@/Components/Text';
import TextStyle from '@/Components/TextStyle';
import Tooltip from '@/Components/Tooltip';
import get from 'lodash/get';
import * as React from 'react';
import { Check } from 'types/Check';

export function TotalPrice({
    orderDetails,
    check,
}: {
    orderDetails: any | null;
    check: Check;
}) {
    if (
        orderDetails?.totalPriceSet?.shopMoney?.currencyCode &&
        orderDetails?.totalPriceSet?.shopMoney?.amount
    ) {
        console.log('total price from orderDetails');
        return (
            <Section title="Total Price">
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency:
                        orderDetails?.totalPriceSet?.shopMoney?.currencyCode,
                }).format(
                    parseFloat(
                        `${orderDetails?.totalPriceSet?.shopMoney?.amount}`,
                    ),
                )}
            </Section>
        );
    }

    if (
        check.shopifyOrder?.total_price_set?.shop_money?.amount &&
        check?.shopifyOrder?.total_price_set?.shop_money?.currency_code
    ) {
        console.log('total price from check.shopifyOrder');
        return (
            <Section title="Total Price">
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency:
                        check?.shopifyOrder?.total_price_set?.shop_money
                            ?.currency_code,
                }).format(
                    parseFloat(
                        `${check?.shopifyOrder?.total_price_set?.shop_money?.amount}`,
                    ),
                )}
            </Section>
        );
    }

    if (check.order?.total?.currency && check?.order?.total?.amount) {
        console.log('total price from check.order');
        return (
            <Section title="Total Price">
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: check.order?.total?.currency,
                }).format(parseFloat(`${check?.order?.total?.amount}`))}
            </Section>
        );
    }

    return <></>;
}

export default function Details({
    orderDetails,
    loading,
    check,
}: {
    orderDetails: GraphQLShopifyOrderData | null;
    loading: boolean;
    check: Check | null;
}) {
    return (
        <Card
            padding="xs"
            title={
                loading ? (
                    <SkeletonDisplayText />
                ) : (
                    <>
                        {orderDetails?.name && (
                            <strong>Order {orderDetails.name}</strong>
                        )}
                    </>
                )
            }
        >
            {loading ? (
                <>
                    <Section>
                        <SkeletonDisplayText />
                        <SkeletonBodyText lines={3} />
                    </Section>
                    <Section>
                        <SkeletonDisplayText />
                        <SkeletonBodyText lines={3} />
                    </Section>
                    <Section>
                        <SkeletonDisplayText />
                        <SkeletonBodyText lines={3} />
                    </Section>
                    <Section>
                        <SkeletonDisplayText />
                        <SkeletonBodyText lines={3} />
                    </Section>
                </>
            ) : (
                <>
                    {(check?.shopifyOrder || orderDetails?.customer) && (
                        <Section title="Customer">
                            {check?.shopifyOrder?.customer?.first_name ||
                                check?.order?.customer?.first_name ||
                                orderDetails?.customer?.firstName}{' '}
                            {check?.shopifyOrder?.customer?.last_name ||
                                check?.order?.customer?.last_name ||
                                orderDetails?.customer?.lastName}
                            {(check?.shopifyOrder?.customer?.email ||
                                check?.order?.customer?.email ||
                                orderDetails?.customer?.email) && (
                                <>
                                    <br />
                                    {check?.shopifyOrder?.customer?.email ||
                                        check?.order?.customer?.email ||
                                        orderDetails?.customer?.email}
                                </>
                            )}
                            {check?.shopifyOrder?.customer?.phone ||
                                check?.shopifyOrder?.customer?.phone ||
                                (orderDetails?.customer?.phone && (
                                    <>
                                        <br />
                                        {check?.shopifyOrder?.customer?.phone ||
                                            orderDetails?.customer?.phone}
                                    </>
                                ))}
                        </Section>
                    )}
                    {!check?.shopifyOrder?.shipping_address &&
                        orderDetails?.shippingAddress?.formatted && (
                            <Section title="Shipping Address">
                                {get(
                                    orderDetails,
                                    'shippingAddress.formatted',
                                    [],
                                ).map((line: string) => (
                                    <React.Fragment key={line}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </Section>
                        )}
                    {check?.shopifyOrder?.shipping_address && (
                        <Section title="Shipping Address">
                            <React.Fragment>
                                {check.order?.shipping_address?.first_name ||
                                    check.shopifyOrder?.shipping_address
                                        ?.first_name}{' '}
                                {check.order?.shipping_address?.last_name ||
                                    check.shopifyOrder?.shipping_address
                                        ?.last_name}
                                <br />
                            </React.Fragment>
                            <React.Fragment>
                                {check.order?.shipping_address?.address_1 ||
                                    check.shopifyOrder?.shipping_address
                                        ?.address1}
                                <br />
                            </React.Fragment>
                            {check.order?.shipping_address?.address_2 ||
                                (check.shopifyOrder?.shipping_address
                                    ?.address2 && (
                                    <>
                                        {check.order?.shipping_address
                                            ?.address_2 ||
                                            check.shopifyOrder?.shipping_address
                                                ?.address2}
                                        <br />
                                    </>
                                ))}
                            <>
                                {check.order?.shipping_address?.state ||
                                    check.shopifyOrder?.shipping_address
                                        ?.province}
                                ,{' '}
                                {check.order?.shipping_address?.country ||
                                    check.shopifyOrder?.shipping_address
                                        ?.country}
                                <br />
                            </>
                        </Section>
                    )}
                    {orderDetails?.billingAddress &&
                        !check?.shopifyOrder?.billing_address && (
                            <Section title="Billing Address">
                                {orderDetails.billingAddressMatchesShippingAddress ? (
                                    <TextStyle variation="subdued">
                                        Same as shipping address.
                                    </TextStyle>
                                ) : (
                                    get(
                                        orderDetails,
                                        'billingAddress.formatted',
                                        [],
                                    ).map((line: string) => (
                                        <React.Fragment key={line}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))
                                )}
                            </Section>
                        )}
                    {(check?.shopifyOrder?.billing_address ||
                        check?.order?.billing_address) && (
                        <Section title="Billing Address">
                            <React.Fragment>
                                {check.order?.billing_address?.first_name ||
                                    check.shopifyOrder?.billing_address
                                        ?.first_name}{' '}
                                {check.order?.billing_address?.last_name ||
                                    check.shopifyOrder?.billing_address
                                        ?.last_name}
                                <br />
                            </React.Fragment>
                            <React.Fragment>
                                {check.order?.billing_address?.address_1 ||
                                    check.shopifyOrder?.billing_address
                                        ?.address1}
                                <br />
                            </React.Fragment>
                            {check.order?.billing_address?.address_2 ||
                                (check.shopifyOrder?.billing_address
                                    ?.address2 && (
                                    <>
                                        {check.order?.billing_address
                                            ?.address_2 ||
                                            check.shopifyOrder?.billing_address
                                                ?.address2}
                                        <br />
                                    </>
                                ))}
                            <>
                                {check.order?.billing_address?.state ||
                                    check.shopifyOrder?.billing_address
                                        ?.province}
                                ,{' '}
                                {check.order?.billing_address?.country ||
                                    check.shopifyOrder?.billing_address
                                        ?.country}
                                <br />
                            </>
                        </Section>
                    )}

                    <TotalPrice check={check} orderDetails={orderDetails} />
                    <Payments orderDetails={orderDetails} />
                </>
            )}
        </Card>
    );
}

export function Payments({ orderDetails }: { orderDetails: any | null }) {
    if (!orderDetails?.transactions) {
        return <></>;
    }
    return (
        <Section
            title={
                orderDetails?.transactions.length > 0 ? 'Payment' : 'Payments'
            }
        >
            {orderDetails.transactions.map((txn) => {
                return (
                    <>
                        {txn?.paymentDetails?.name && (
                            <Tooltip content="Card holders name">
                                <Text variant="bodyMd" as="span">
                                    {txn.paymentDetails.name}
                                </Text>
                            </Tooltip>
                        )}
                        {txn?.paymentDetails?.company && (
                            <Tooltip content="Card holders company">
                                <Text variant="bodyMd" as="span">
                                    {txn.paymentDetails.company}
                                </Text>
                            </Tooltip>
                        )}
                        {txn?.accountNumber && (
                            <Tooltip content="Obscured account number">
                                <Text variant="bodyMd" as="span">
                                    {txn.accountNumber}
                                </Text>
                            </Tooltip>
                        )}
                        {txn?.gateway && (
                            <Tooltip content="Payment gateway">
                                <Badge>{txn.gateway}</Badge>
                            </Tooltip>
                        )}
                    </>
                );
            })}
        </Section>
    );
}
