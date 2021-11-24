/*  @TODO
    Add Number of People Active State (Number of People Can't be Zero Warning)
    -Change input parsing to allow for a zero value.
    -Create a style that is applied when the value is zero.
    Fixed clipping on the "Custom" default state text
    Make the calculator larger on large screens (150%)
    Add margin from top on large screens
    Reduce Font Size of Title on Large Screens & possible on small too?
    Disable Mouseover Reset Button when in disabled state.
    Check math for example input ($142.55 & 5 people)
    Input validation for the Custom Input Field
    Output validation for UI.
*/

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

/* FONT */
const fontFamily = "'Space Mono', monospace";
const formInputSize = "24px";

/* BREAKPOINTS */
const BREAKPOINT = {
    MD: "768px",
};

/* MISC */
const borderRadiusSmall = "5px";
const horizontalPadding = "12px";

/* COMPONENTS */
const Wrapper = styled.div`
    background-color: ${colorNeutralCyanLight1};
    min-height: 100vh;
    display: grid;
    grid-template-rows: 15% auto;
    place-items: center;
    font-family: ${fontFamily};
`;

const Title = styled.h1`
    color: ${colorNeutralCyanDark1};
    text-transform: uppercase;
    letter-spacing: 10px;
`;

const Calculator = styled.div`
    max-width: 375px;
    background-color: ${colorWhite};
    border-radius: 20px;
    overflow: hidden;
    padding: 30px;
    align-self: start;

    @media only screen and (min-width: 768px) {
        display: flex;
        justify-content: space-between;
        max-width: 768px;
        margin-top: 50px;
    }
`;

const Inputs = styled.form`
    @media only screen and (min-width: 768px) {
        flex: 0 0 50%;
    }
`;

const FormInputGroup = styled.div`
    margin-bottom: 24px;
`;

const InputLabel = styled.label`
    color: ${colorNeutralCyanDark2};
    font-size: ${formInputSize / 2};
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
`;

const InputWrapper = styled.div`
    display: block;
    width: 100%;
    position: relative;
`;

// @TODO color is not working
const IconStyle = {
    position: "absolute",
    top: "50%",
    left: horizontalPadding,
    transform: "translateY(-50%)",
};

const Input = styled.input`
    display: block;
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

    &:focus-visible {
        outline-color: ${colorPrimary};
    }

    &::placeholder {
        color: ${colorNeutralCyanDark3};
    }

    @media only screen and (hover: hover) {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            margin-left: 10px;
        }
    }
`;

const CustomInput = styled(Input)`
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
    grid-gap: 15px 15px;

    & > Button#${(props) => props.activeId} {
        background-color: ${colorPrimary};
        color: ${colorNeutralCyanDark1};
    }

    & > Input#${(props) => props.activeId} {
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
    padding: 4px 0;
    font-weight: bold;
    cursor: pointer;

    @media only screen and (min-width: 768px) {
        &:hover {
            background-color: hsl(172, 67%, 80%);
            color: ${colorNeutralCyanDark1};
        }
    }
`;

const Outputs = styled.div`
    background-color: ${colorNeutralCyanDark1};
    border-radius: 10px;
    padding: 24px 16px;

    @media only screen and (min-width: 768px) {
        flex: 1 0 auto;
        margin-left: 30px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const OutputGroup = styled.dl`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
`;

const OutputLabel = styled.dt`
    color: ${colorWhite};
    font-weight: bold;

    &::after {
        content: "/ person";
        display: block;
        font-size: 14px;
        color: ${colorNeutralCyanDark3};
    }
`;

const OutputValue = styled.dd`
    color: ${colorPrimary};
    font-weight: bold;
    font-size: 30px;
`;

const ResetButton = styled(Button)`
    background-color: ${colorPrimary};
    color: ${colorNeutralCyanDark1};
    text-transform: uppercase;
    width: 100%;
    font-size: 20px;

    &:disabled {
        opacity: 20%;
    }
`;

/* CONSTANTS */
const TIP_PERCENTAGE = {
    tip5: 0.05,
    tip10: 0.1,
    tip15: 0.15,
    tip25: 0.25,
    tip50: 0.5,
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

        let userInput = event.target.value;

        let [whole, _] = userInput.split(".");
        whole = whole.length > 13 ? whole.slice(0, 13) : whole;
        const decimal = userInput.match(/\.\d{0,2}/g);
        const num = whole + (decimal || ".00");

        if (userInput.length === 0 || Number(userInput) < 0) {
            setBillAmount("");
        } else if (/\.0$/g.test(num)) {
            setBillAmount(num);
        } else {
            setBillAmount(Number(num));
        }
    }

    // TODO add Input validation
    function onCustomChange(event) {
        event.preventDefault();
        setTipPercentage(Number(event.target.value / 100));
        setActiveTipButtonID("custom");
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

        if (userInput < 1) {
            setNumberOfPeople("");
        } else {
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
            const tipAmount = billAmount * tipPercentage;
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
                            <CustomInput
                                id="custom"
                                type="number"
                                step="1"
                                placeholder="Custom"
                                value={activeTipButtonID === "custom" ? tipPercentage * 100 : ""}
                                onChange={onCustomChange}
                            ></CustomInput>
                        </ButtonGroup>
                    </FormInputGroup>
                    <FormInputGroup>
                        <InputLabel htmlFor="people">Number of People</InputLabel>
                        <InputWrapper>
                            <PersonIcon style={IconStyle} />
                            <Input
                                id="people"
                                type="number"
                                step="1"
                                placeholder="0"
                                value={numberOfPeople}
                                onChange={onPeopleChange}
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
