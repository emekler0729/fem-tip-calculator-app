import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { ReactComponent as DollarIcon } from "./images/icon-dollar.svg";
import { ReactComponent as PersonIcon } from "./images/icon-person.svg";

/* COLORS */
const colorPrimary = "hsl(172, 67%, 45%)";
const colorNeutralCyanDark1 = "hsl(183, 100%, 15%)";
const colorNeutralCyanDark2 = "hsl(186, 14%, 43%)";
const colorNeutralCyanDark3 = "hsl(184, 14%, 56%)";
const colorNeutralCyanLight1 = "hsl(185, 41%, 84%)";
const colorNeutralCyanLight2 = "hsl(189, 41%, 97%)";
const colorWhite = "hsl(0, 0%, 100%)";
const colorAlert = "#ff7000";

/* FONT */
const fontFamily = "'Space Mono', monospace";
const formInputSize = "2.4rem";

/* BREAKPOINTS */
const BREAKPOINT = {
    MD: "768px",
};

/* MISC */
const borderRadiusSmall = "5px";
const horizontalPadding = "1.2rem";
const titlePadding = "5rem";

/* COMPONENTS */
const Wrapper = styled.div`
    background-color: ${colorNeutralCyanLight1};
    min-height: 100vh;
    display: grid;
    grid-template-rows: 15% auto;
    place-items: center;
    font-family: ${fontFamily};

    @media only screen and (min-width: ${BREAKPOINT.MD}) {
        padding-top: ${titlePadding};
    }
`;

const Title = styled.h1`
    color: ${colorNeutralCyanDark1};
    text-transform: uppercase;
    letter-spacing: 10px;
    font-size: 2.4rem;

    @media only screen and (min-width: ${BREAKPOINT.MD}) {
        margin-bottom: ${titlePadding};
    }
`;

const Calculator = styled.div`
    max-width: 375px;
    background-color: ${colorWhite};
    border-radius: 20px;
    overflow: hidden;
    padding: 3rem;
    align-self: start;

    @media only screen and (max-width: 374px) {
        padding: 1rem;
    }

    @media only screen and (min-width: 768px) {
        display: flex;
        justify-content: space-between;
        max-width: 76.8rem;
    }
`;

const Inputs = styled.form`
    @media only screen and (min-width: 768px) {
        flex: 0 0 50%;
    }
`;

const FormInputGroup = styled.div`
    &:not(:last-of-type) {
        margin-bottom: 2.4rem;
    }

    @media only screen and (max-width: ${BREAKPOINT.MD}) {
        margin-bottom: 2.4rem;
    }

    position: relative;
`;

const InputLabel = styled.label`
    color: ${colorNeutralCyanDark2};
    font-size: 1.6rem;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 0.5rem;
`;

const AlertLabel = styled(InputLabel)`
    display: inline;
    position: absolute;
    right: 0;
    text-align: right;
    color: ${colorAlert};
    opacity: ${(props) => (props.alert ? "100%" : "0%")};

    transition: opacity 0.1s;

    @media only screen and (max-width: 374px) {
        font-size: 1.2rem;
        top: 4px;
    }
`;

const InputWrapper = styled.div`
    display: block;
    width: 100%;
    position: relative;
`;

const IconStyle = {
    position: "absolute",
    top: "50%",
    left: horizontalPadding,
    transform: "translateY(-50%)",
    zIndex: 1,
    fontSize: "1.6rem",
};

const PercentIcon = styled.span`
    position: absolute;
    display: ${(props) => (props.active === "custom" ? "grid" : "none")};
    place-items: center;
    height: 100%;
    top: 0;
    right: ${horizontalPadding};
    font-size: 2.4rem;
    color: ${colorNeutralCyanDark1};
    font-weight: bold;
`;

const Input = styled.input`
    display: block;
    position: relative;
    width: 100%;
    font-size: ${formInputSize};
    font-family: ${fontFamily};
    text-align: right;
    border: none;
    background-color: ${colorNeutralCyanLight2};
    padding: 0 ${horizontalPadding};
    border-radius: ${borderRadiusSmall};
    color: ${colorNeutralCyanDark1};
    font-weight: bold;
    cursor: pointer;

    outline: ${(props) => (props.alert ? `${colorAlert} auto 1px` : "none")};
    transition: outline 0.1s;

    &:focus-visible {
        outline-style: auto;
        outline-width: 1px;
        outline-color: ${(props) => (props.alert ? colorAlert : colorPrimary)};
    }

    &::placeholder {
        color: ${colorNeutralCyanDark3};
    }

    @media only screen and (hover: hover) {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            margin-left: 1rem;
        }
    }
`;

const CustomInput = styled(Input)`
    padding-right: ${(props) => (props.active === "custom" ? "2.8rem" : horizontalPadding)};
    height: 100%;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &::placeholder {
        color: ${colorNeutralCyanDark2};
        @media only screen and (min-width: ${BREAKPOINT.MD}) {
            letter-spacing: -1px;
        }
    }
`;

const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5rem 1.5rem;

    & > Button#${(props) => props.activeId} {
        background-color: ${colorPrimary};
        color: ${colorNeutralCyanDark1};
    }

    & Input#${(props) => props.activeId} {
        outline: ${colorPrimary} auto 1px;
        outline-offset: 0px;
    }

    @media only screen and (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const Button = styled.button`
    background-color: ${colorNeutralCyanDark1};
    border: none;
    border-radius: ${borderRadiusSmall};
    color: ${colorWhite};
    font-size: ${formInputSize};
    font-family: ${fontFamily};
    padding: 0.4rem 0;
    font-weight: bold;

    transition: background-color 0.1s, color 0.1s;

    &:not(:disabled) {
        cursor: pointer;
    }

    @media only screen and (hover: hover) {
        &:not(:disabled):hover {
            background-color: hsl(172, 67%, 80%);
            color: ${colorNeutralCyanDark1};
        }
    }
`;

const Outputs = styled.div`
    background-color: ${colorNeutralCyanDark1};
    border-radius: 10px;
    padding: 2.4rem 1.6rem;

    @media only screen and (min-width: 768px) {
        flex: 1 0 auto;
        margin-left: 3rem;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const OutputGroup = styled.dl`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
`;

const OutputLabel = styled.dt`
    color: ${colorWhite};
    font-weight: bold;
    font-size: 1.6rem;

    &::after {
        content: "/ person";
        display: block;
        font-size: 1.4rem;
        color: ${colorNeutralCyanDark3};
    }

    @media only screen and (max-width: 374px) {
        font-size: 1.5rem;
    }
`;

const OutputValue = styled.dd`
    color: ${colorPrimary};
    font-weight: bold;
    font-size: 3rem;
    @media only screen and (max-width: 374px) {
        font-size: 2.7rem;
    }
`;

const ResetButton = styled(Button)`
    background-color: ${colorPrimary};
    color: ${colorNeutralCyanDark1};
    text-transform: uppercase;
    width: 100%;
    font-size: 2rem;

    &:disabled {
        opacity: 20%;
    }
`;

/* CONSTANTS */
const TIP_PERCENTAGE = {
    tip5: 5,
    tip10: 10,
    tip15: 15,
    tip25: 25,
    tip50: 50,
};

const DEFAULT = {
    BILL_AMOUNT: "",
    ACTIVE_TIP_BUTTON_ID: "",
    TIP_PERCENTAGE: "",
    NUMBER_OF_PEOPLE: "",
};

function App() {
    const [billAmount, setBillAmount] = useState(DEFAULT.BILL_AMOUNT);
    const [activeTipButtonID, setActiveTipButtonID] = useState(DEFAULT.ACTIVE_TIP_BUTTON_ID);
    const [tipPercentage, setTipPercentage] = useState(DEFAULT.TIP_PERCENTAGE);
    const [numberOfPeople, setNumberOfPeople] = useState(DEFAULT.NUMBER_OF_PEOPLE);
    const [tipAmount, setTipAmount] = useState(0.0);
    const [totalAmount, setTotalAmount] = useState(0.0);

    function onBillChange(event) {
        event.preventDefault();

        const userInput = event.target.value;

        let [whole, _] = userInput.split(".");
        let decimal;
        let num;
        if (whole == 100000) {
            num = 99999.99;
        } else {
            whole = whole.length > 5 ? whole.slice(0, 5) : whole;
            decimal = userInput.match(/\.\d{0,2}/g);
            num = whole + (decimal || ".00");
        }

        if (userInput.length === 0 || Number(userInput) < 0) {
            setBillAmount("");
        } else if (/\.0$/g.test(num)) {
            setBillAmount(num);
        } else {
            setBillAmount(Number(num));
        }
    }

    function onCustomChange(event) {
        event.preventDefault();

        const userInput = event.target.value;

        let [whole, _] = userInput.split(".");
        if (whole == 1000) {
            whole = 999;
        } else {
            whole = whole.length > 3 ? whole.slice(0, 3) : whole;
        }

        if (whole < 1) {
            setTipPercentage("");
            setActiveTipButtonID("");
        } else {
            setTipPercentage(whole);
            setActiveTipButtonID("custom");
        }
    }

    function onButtonClick(event) {
        event.preventDefault();
        const id = event.target.id;
        if (id === "custom") {
        } else {
            setActiveTipButtonID(id);
            setTipPercentage(TIP_PERCENTAGE[id]);
        }
    }

    function onPeopleChange(event) {
        event.preventDefault();
        let userInput = event.target.value;

        if (userInput < 0) {
            setNumberOfPeople("");
        } else if (userInput > 999) {
            setNumberOfPeople(999);
        } else {
            console.log({ userInput });
            console.log(parseInt(userInput));
            setNumberOfPeople(parseInt(userInput));
        }
    }

    function reset() {
        setBillAmount(DEFAULT.BILL_AMOUNT);
        setActiveTipButtonID(DEFAULT.ACTIVE_TIP_BUTTON_ID);
        setTipPercentage(DEFAULT.TIP_PERCENTAGE);
        setNumberOfPeople(DEFAULT.NUMBER_OF_PEOPLE);
    }

    useEffect(() => {
        if (billAmount && tipPercentage && numberOfPeople) {
            const tipAmount = (billAmount * tipPercentage) / 100;
            const total = parseFloat(billAmount) + parseFloat(tipAmount);

            setTipAmount(tipAmount / numberOfPeople);
            setTotalAmount(total / numberOfPeople);
        } else {
            setTipAmount(0);
            setTotalAmount(0);
        }
    }, [billAmount, tipPercentage, numberOfPeople]);

    return (
        <Wrapper>
            <Title>
                Spli
                <br />
                tter
            </Title>
            <Calculator>
                <Inputs>
                    <FormInputGroup>
                        <InputLabel htmlFor="bill">Bill</InputLabel>
                        <InputWrapper>
                            <DollarIcon style={IconStyle} />
                            <Input
                                id="bill"
                                type="number"
                                step="0.01"
                                placeholder="0"
                                inputMode="decimal"
                                value={billAmount.toString()}
                                onChange={onBillChange}
                            ></Input>
                        </InputWrapper>
                    </FormInputGroup>
                    <FormInputGroup>
                        <InputLabel>Select Tip %</InputLabel>
                        <ButtonGroup activeId={activeTipButtonID}>
                            <Button onClick={onButtonClick} id="tip5">
                                5%
                            </Button>
                            <Button onClick={onButtonClick} id="tip10">
                                10%
                            </Button>
                            <Button onClick={onButtonClick} id="tip15">
                                15%
                            </Button>
                            <Button onClick={onButtonClick} id="tip25">
                                25%
                            </Button>
                            <Button onClick={onButtonClick} id="tip50">
                                50%
                            </Button>
                            <InputWrapper>
                                <CustomInput
                                    id="custom"
                                    type="number"
                                    step="1"
                                    placeholder="Custom"
                                    inputMode="decimal"
                                    value={activeTipButtonID === "custom" ? tipPercentage.toString() : ""}
                                    onInput={onCustomChange}
                                    active={activeTipButtonID}
                                ></CustomInput>
                                <PercentIcon active={activeTipButtonID}>%</PercentIcon>
                            </InputWrapper>
                        </ButtonGroup>
                    </FormInputGroup>
                    <FormInputGroup>
                        <InputLabel htmlFor="people">Number of People</InputLabel>
                        <AlertLabel as="span" alert={numberOfPeople === 0}>
                            Can't be zero
                        </AlertLabel>
                        <InputWrapper>
                            <PersonIcon style={IconStyle} />
                            <Input
                                id="people"
                                type="number"
                                step="1"
                                placeholder="0"
                                inputMode="decimal"
                                value={numberOfPeople.toString()}
                                onChange={onPeopleChange}
                                alert={numberOfPeople === 0}
                            ></Input>
                        </InputWrapper>
                    </FormInputGroup>
                </Inputs>
                <Outputs>
                    <div>
                        <OutputGroup>
                            <OutputLabel>Tip Amount</OutputLabel>
                            <OutputValue>${tipAmount.toFixed(2)}</OutputValue>
                        </OutputGroup>
                        <OutputGroup>
                            <OutputLabel>Total</OutputLabel>
                            <OutputValue>${totalAmount.toFixed(2)}</OutputValue>
                        </OutputGroup>
                    </div>
                    <ResetButton disabled={!(billAmount || tipPercentage || numberOfPeople)} onClick={reset}>
                        Reset
                    </ResetButton>
                </Outputs>
            </Calculator>
        </Wrapper>
    );
}

export default App;
