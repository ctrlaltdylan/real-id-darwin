import Button from '@/Components/Button';
import Card, { Section } from '@/Components/Card';
import useShop from '@/Components/Hooks/useShop';
import useToast from '@/Components/Hooks/useToast';
import TextField from '@/Components/TextInput';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Check } from 'types/Check';

export default function EmptyOrderState({ check }: { check: Check }) {
    const { shop } = useShop();
    const setToast = useToast();

    if (!check?.id || !shop) {
        return <></>;
    }

    return (
        <Card title="ID check link" padding="xs">
            <Section>
                <TextField
                    autoComplete="off"
                    value={
                        shop?.settings?.customFlowUrl
                            ? shop?.settings.customFlowUrl.replace(
                                  '{{checkId}}',
                                  check?.id,
                              )
                            : import.meta.env.VITE_FLOW_URL.replace(
                                  '{{checkId}}',
                                  check?.id,
                              )
                    }
                    readOnly={true}
                    label=""
                    helpText="This is the same link that was sent to the customer"
                    connectedRight={
                        <CopyToClipboard
                            text={
                                shop?.settings?.customFlowUrl
                                    ? shop?.settings.customFlowUrl.replace(
                                          '{{checkId}}',
                                          check?.id,
                                      )
                                    : import.meta.env.VITE_FLOW_URL.replace(
                                          '{{checkId}}',
                                          check?.id,
                                      )
                            }
                            onCopy={() => setToast('ID Check URL copied.')}
                        >
                            <Button variant="connected">Copy</Button>
                        </CopyToClipboard>
                    }
                />
            </Section>
        </Card>
    );
}
