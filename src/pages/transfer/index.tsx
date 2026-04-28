import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
    Alert, Button, Card, Flex, Input, Radio,
    Select, Steps, Tag, Typography
} from "antd"
import { CheckCircleFilled } from "@ant-design/icons"
import { TbArrowsExchange, TbBuildingBank, TbClock, TbSparkles, TbUser, TbUserPlus } from "react-icons/tb"
import withLayout from "../../layout/withLayout"
import "./index.scss"

const { Text, Title } = Typography


interface Channel {
    id: string
    name: string
    receive: string
    fee: string
    duration: string
    isBest: boolean
}

interface Recipient {
    id: string
    name: string
    bank: string
    flag: string
    country: string
    relation: string
    color: string
}


const CHANNELS: Channel[] = [
    { id: "wise", name: "Wise", receive: "₺16,960", fee: "$4.20", duration: "1-2 iş günü", isBest: true },
    { id: "remitly", name: "Remitly", receive: "₺16,780", fee: "$2.99", duration: "3-5 iş günü", isBest: false },
    { id: "wu", name: "Western Union", receive: "₺16,340", fee: "$9.90", duration: "Anında", isBest: false },
]

const RECIPIENTS: Recipient[] = [
    { id: "1", name: "Ayşe E. (Anne)", bank: "Ziraat Bankası · TR94 0001 ****", flag: "🇹🇷", country: "Türkiye", relation: "Anne", color: "#1b4fd8" },
    { id: "2", name: "Mehmet K.", bank: "Deutsche Bank · DE89 3704 ****", flag: "🇩🇪", country: "Almanya", relation: "İş Ortağı", color: "#0ea371" },
    { id: "3", name: "Fatma Y.", bank: "Barclays · GB29 NWBK ****", flag: "🇬🇧", country: "İngiltere", relation: "Kardeş", color: "#d97706" },
    { id: "4", name: "Mehmet E. (Kardeş)", bank: "İş Bankası · TR33 0006 ****", flag: "🇹🇷", country: "Türkiye", relation: "Kardeş", color: "#7c3aed" },
]

const CURRENCIES = ["USD", "EUR", "GBP", "NOK", "CHF"]
const TARGET_CURRENCIES = ["TRY", "USD", "EUR", "GBP"]

// ── Page ───────────────────────────────────────────────────────────────────

const Transfer = () => {
    const { t } = useTranslation()

    const [currentStep, setCurrentStep] = useState(0)
    const [amount, setAmount] = useState("")
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("TRY")
    const [selectedChannel, setSelectedChannel] = useState("wise")
    const [selectedRecipient, setSelectedRecipient] = useState("")
    const [timing, setTiming] = useState("now")

    const next = () => setCurrentStep(s => s + 1)
    const prev = () => setCurrentStep(s => s - 1)

    const rate = 33.92
    const received = amount
        ? (parseFloat(amount) * rate).toLocaleString("tr-TR", { maximumFractionDigits: 0 })
        : "0"

    const activeChannel = CHANNELS.find(c => c.id === selectedChannel)
    const activeRecipient = RECIPIENTS.find(r => r.id === selectedRecipient)

    return (

        <div className="send-page">
            <div className="send">
                <div className="send__steps-wrapper">
                    <Steps
                        current={currentStep > 3 ? 3 : currentStep}
                        size="small"
                        className="send__steps"
                        items={[
                            { title: t("send.step1"), icon: <TbArrowsExchange size={16} /> },
                            { title: t("send.step2"), icon: <TbBuildingBank size={16} /> },
                            { title: t("send.step3"), icon: <TbUser size={16} /> },
                            { title: t("send.step4"), icon: <CheckCircleFilled /> },
                        ]}
                    />
                </div>

                {currentStep === 0 && (
                    <div className="send__step-content">

                        <Alert
                            type="info"
                            showIcon
                            icon={<span className="send__ai-icon">✦</span>}
                            message={<Text strong className="send__ai-label">{t("send.aiLabel")}</Text>}
                            description={<Text className="send__ai-message">{t("send.aiTimingMessage")}</Text>}
                            className="send__ai-banner"
                        />

                        <Card className="send__card">
                            <Title level={5} className="send__card-title">{t("send.amountTitle")}</Title>

                            <div className="send__currency-row">
                                <div className="send__currency-group">
                                    <label className="send__label">{t("send.youSend")}</label>
                                    <div className="send__currency-input">
                                        <Select
                                            value={fromCurrency}
                                            onChange={setFromCurrency}
                                            className="send__currency-select"
                                            options={CURRENCIES.map(c => ({ value: c, label: c }))}
                                        />
                                        <Input
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            type="number"
                                            className="send__amount-input"
                                        />
                                    </div>
                                </div>

                                <div className="send__exchange-icon">
                                    <TbArrowsExchange size={22} />
                                </div>

                                <div className="send__currency-group">
                                    <label className="send__label">{t("send.theyReceive")}</label>
                                    <div className="send__currency-input">
                                        <Select
                                            value={toCurrency}
                                            onChange={setToCurrency}
                                            className="send__currency-select"
                                            options={TARGET_CURRENCIES.map(c => ({ value: c, label: c }))}
                                        />
                                        <Input
                                            value={received}
                                            readOnly
                                            className="send__amount-input send__amount-input--readonly"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="send__rate-info">
                                <TbBuildingBank size={14} />
                                <Text className="send__rate-text">
                                    1 {fromCurrency} = {rate} {toCurrency} · {t("send.midMarketRate")}
                                </Text>
                            </div>
                        </Card>

                        <Card className="send__card">
                            <Title level={5} className="send__card-title">{t("send.timingTitle")}</Title>
                            <Radio.Group
                                value={timing}
                                onChange={e => setTiming(e.target.value)}
                                className="send__timing-group"
                            >
                                <Radio value="now" className="send__timing-option">
                                    <div className="send__timing-content">
                                        <Text strong className="send__timing-label">{t("send.sendNow")}</Text>
                                        <Text className="send__timing-desc">{t("send.sendNowDesc")}</Text>
                                    </div>
                                </Radio>
                                <Radio value="ai" className="send__timing-option">
                                    <div className="send__timing-content">
                                        <Flex align="center" gap={6}>
                                            <Text strong className="send__timing-label">{t("send.aiOptimize")}</Text>
                                            <Tag color="blue" className="send__ai-tag"><TbSparkles size={10} /> AI</Tag>
                                        </Flex>
                                        <Text className="send__timing-desc">{t("send.aiOptimizeDesc")}</Text>
                                    </div>
                                </Radio>
                                <Radio value="schedule" className="send__timing-option">
                                    <div className="send__timing-content">
                                        <Flex align="center" gap={6}>
                                            <Text strong className="send__timing-label">{t("send.scheduleDate")}</Text>
                                            <TbClock size={14} />
                                        </Flex>
                                        <Text className="send__timing-desc">{t("send.scheduleDateDesc")}</Text>
                                    </div>
                                </Radio>
                            </Radio.Group>
                        </Card>

                        <Flex justify="flex-end">
                            <Button
                                type="primary"
                                size="large"
                                disabled={!amount || parseFloat(amount) <= 0}
                                onClick={next}
                                className="send__next-btn"
                            >
                                {t("send.continue")}
                            </Button>
                        </Flex>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="send__step-content">

                        <Card className="send__card">
                            <Title level={5} className="send__card-title">{t("send.channelTitle")}</Title>
                            <Text className="send__channel-subtitle">{t("send.channelSubtitle")}</Text>

                            <div className="send__channels">
                                {CHANNELS.map(channel => (
                                    <div
                                        key={channel.id}
                                        onClick={() => setSelectedChannel(channel.id)}
                                        className={[
                                            "send__channel-option",
                                            selectedChannel === channel.id ? "send__channel-option--selected" : "",
                                            channel.isBest ? "send__channel-option--best" : "",
                                        ].join(" ")}
                                    >
                                        <div className="send__channel-left">
                                            <div className="send__channel-logo">{channel.name[0]}</div>
                                            <div className="send__channel-info">
                                                <Flex align="center" gap={8}>
                                                    <Text strong className="send__channel-name">{channel.name}</Text>
                                                    {channel.isBest && (
                                                        <Tag color="success" className="send__best-tag">{t("send.bestRate")}</Tag>
                                                    )}
                                                </Flex>
                                                <Text className="send__channel-duration">
                                                    <TbClock size={12} /> {channel.duration}
                                                </Text>
                                            </div>
                                        </div>
                                        <div className="send__channel-right">
                                            <Text strong className="send__channel-receive">{channel.receive}</Text>
                                            <Text className="send__channel-fee">{t("send.fee")}: {channel.fee}</Text>
                                        </div>
                                        {selectedChannel === channel.id && (
                                            <CheckCircleFilled className="send__channel-check" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="send__card">
                            <Flex justify="space-between" align="center">
                                <Text className="send__summary-label">{t("send.youSend")}</Text>
                                <Text strong className="send__summary-value">{amount} {fromCurrency}</Text>
                            </Flex>
                            <Flex justify="space-between" align="center" style={{ marginTop: 8 }}>
                                <Text className="send__summary-label">{t("send.fee")}</Text>
                                <Text strong className="send__summary-value">{activeChannel?.fee}</Text>
                            </Flex>
                            <div className="send__summary-divider" />
                            <Flex justify="space-between" align="center">
                                <Text className="send__summary-label">{t("send.theyReceive")}</Text>
                                <Text strong className="send__summary-receive">
                                    {activeChannel?.receive} {toCurrency}
                                </Text>
                            </Flex>
                        </Card>

                        <Flex justify="space-between">
                            <Button size="large" onClick={prev}>{t("send.back")}</Button>
                            <Button
                                type="primary"
                                size="large"
                                disabled={!selectedChannel}
                                onClick={next}
                                className="send__next-btn"
                            >
                                {t("send.continue")}
                            </Button>
                        </Flex>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="send__step-content">

                        <Card className="send__card">
                            <Flex justify="space-between" align="center" className="send__card-header">
                                <Title level={5} className="send__card-title">{t("send.recipientTitle")}</Title>
                                <Button icon={<TbUserPlus size={14} />} size="small">
                                    {t("send.addRecipient")}
                                </Button>
                            </Flex>

                            <div className="send__recipients">
                                {RECIPIENTS.map(r => (
                                    <div
                                        key={r.id}
                                        onClick={() => setSelectedRecipient(r.id)}
                                        className={[
                                            "send__recipient-card",
                                            selectedRecipient === r.id ? "send__recipient-card--selected" : "",
                                        ].join(" ")}
                                    >
                                        <div
                                            className="send__recipient-avatar"
                                            style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}99)` }}
                                        >
                                            {r.name.charAt(0)}
                                        </div>
                                        <div className="send__recipient-info">
                                            <Text strong className="send__recipient-name">{r.name}</Text>
                                            <Text className="send__recipient-bank">{r.bank}</Text>
                                            <Tag className="send__recipient-tag">{r.flag} {r.country} · {r.relation}</Tag>
                                        </div>
                                        {selectedRecipient === r.id && (
                                            <CheckCircleFilled className="send__recipient-check" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Flex justify="space-between">
                            <Button size="large" onClick={prev}>{t("send.back")}</Button>
                            <Button
                                type="primary"
                                size="large"
                                disabled={!selectedRecipient}
                                onClick={next}
                                className="send__next-btn"
                            >
                                {t("send.continue")}
                            </Button>
                        </Flex>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="send__step-content">

                        <Card className="send__card">
                            <Title level={5} className="send__card-title">{t("send.confirmTitle")}</Title>

                            <div className="send__confirm-section">
                                <Text className="send__confirm-section-label">{t("send.transferDetails")}</Text>
                                <div className="send__confirm-row">
                                    <Text className="send__confirm-label">{t("send.youSend")}</Text>
                                    <Text strong className="send__confirm-value">{amount} {fromCurrency}</Text>
                                </div>
                                <div className="send__confirm-row">
                                    <Text className="send__confirm-label">{t("send.theyReceive")}</Text>
                                    <Text strong className="send__confirm-value send__confirm-value--green">
                                        {activeChannel?.receive} {toCurrency}
                                    </Text>
                                </div>
                                <div className="send__confirm-row">
                                    <Text className="send__confirm-label">{t("send.fee")}</Text>
                                    <Text strong className="send__confirm-value">{activeChannel?.fee}</Text>
                                </div>
                                <div className="send__confirm-row">
                                    <Text className="send__confirm-label">{t("send.channel")}</Text>
                                    <Text strong className="send__confirm-value">{activeChannel?.name}</Text>
                                </div>
                                <div className="send__confirm-row">
                                    <Text className="send__confirm-label">{t("send.duration")}</Text>
                                    <Text strong className="send__confirm-value">{activeChannel?.duration}</Text>
                                </div>
                            </div>

                            <div className="send__confirm-divider" />

                            <div className="send__confirm-section">
                                <Text className="send__confirm-section-label">{t("send.recipientDetails")}</Text>
                                <div className="send__confirm-recipient">
                                    <div
                                        className="send__recipient-avatar send__recipient-avatar--sm"
                                        style={{ background: `linear-gradient(135deg, ${activeRecipient?.color}, ${activeRecipient?.color}99)` }}
                                    >
                                        {activeRecipient?.name.charAt(0)}
                                    </div>
                                    <div>
                                        <Text strong className="send__recipient-name">{activeRecipient?.name}</Text>
                                        <br />
                                        <Text className="send__recipient-bank">{activeRecipient?.bank}</Text>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Alert
                            type="warning"
                            showIcon
                            message={<Text className="send__confirm-warning">{t("send.confirmWarning")}</Text>}
                            className="send__warning-banner"
                        />

                        <Flex justify="space-between">
                            <Button size="large" onClick={prev}>{t("send.back")}</Button>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => setCurrentStep(4)}
                                className="send__submit-btn"
                            >
                                {t("send.sendNow")} {amount} {fromCurrency}
                            </Button>
                        </Flex>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="send__success">
                        <div className="send__success-icon">✓</div>
                        <Title level={3} className="send__success-title">{t("send.successTitle")}</Title>
                        <Text className="send__success-desc">{t("send.successDesc")}</Text>
                        <Button
                            type="primary"
                            size="large"
                            className="send__next-btn"
                            onClick={() => {
                                setCurrentStep(0)
                                setAmount("")
                                setSelectedRecipient("")
                            }}
                        >
                            {t("send.newTransfer")}
                        </Button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default withLayout(<Transfer />)