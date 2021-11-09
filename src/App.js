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

/* MISC */
const borderRadiusSmall = "5px";
const horizontalPadding = "12px";

/* COMPONENTS */
const Wrapper = styled.div`
    background-color: ${colorNeutralCyanLight1};
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: ${fontFamily};
`;

const Title = styled.h1`
    color: ${colorNeutralCyanDark2};
    text-transform: uppercase;
    letter-spacing: 10px;
`;

const Calculator = styled.div`
    width: 100%;
    background-color: ${colorWhite};
    border-radius: 20px;
    overflow: hidden;
    padding: 30px;
`;

const Inputs = styled.form``;

const FormInputGroup = styled.div`
    margin-bottom: 24px;
`;

const InputLabel = styled.label`
    color: ${colorNeutralCyanDark3};
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

    &:focus-visible {
        outline-color: ${colorPrimary};
    }

    &::placeholder {
        color: ${colorNeutralCyanDark3};
    }
`;

const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px 15px;

    & > #${(props) => props.activeId} {
        background-color: ${colorPrimary};
        color: ${colorNeutralCyanDark1};
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
`;

const CustomButton = styled(Button)`
    background-color: ${colorNeutralCyanLight2};
    color: ${colorNeutralCyanDark3};
`;

const Outputs = styled.div`
    background-color: ${colorNeutralCyanDark1};
    border-radius: 10px;
    padding: 24px 16px;
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
    TIP: { id: "", percentage: 0 },
    NUMBER_OF_PEOPLE: "",
};

function App() {
    const [billAmount, setBillAmount] = useState(DEFAULT.BILL_AMOUNT);
    const [tip, setTip] = useState(DEFAULT.TIP);
    const [numberOfPeople, setNumberOfPeople] = useState(DEFAULT.NUMBER_OF_PEOPLE);
    const [tipAmount, setTipAmount] = useState(0.0);
    const [totalAmount, setTotalAmount] = useState(0.0);

    function onBillChange(event) {
        event.preventDefault();

        const MAX_DIGITS = 15;
        let userInput = event.target.value;

        // @TODO Limit to 2 digits after decimal
        if (userInput.length > MAX_DIGITS) {
            userInput = Number(userInput.slice(0, MAX_DIGITS));
            setBillAmount(Number(userInput));
        } else if (userInput.length === 0) {
            setBillAmount("");
        } else {
            setBillAmount(Number(userInput));
        }
    }

    function onButtonClick(event) {
        event.preventDefault();
        const id = event.target.id;
        if (id === "custom") {
            setTip({ id, percentage: 0.4 });
        } else {
            setTip({ id, percentage: TIP_PERCENTAGE[event.target.id] });
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
        setTip(DEFAULT.TIP);
        setNumberOfPeople(DEFAULT.NUMBER_OF_PEOPLE);
    }

    useEffect(() => {
        if (billAmount && tip.percentage && numberOfPeople) {
            const tipAmount = billAmount * tip.percentage;
            const total = parseFloat(billAmount) + parseFloat(tipAmount);

            setTipAmount(tipAmount / numberOfPeople);
            setTotalAmount(total / numberOfPeople);
        } else {
            setTipAmount(0);
            setTotalAmount(0);
        }
    }, [billAmount, tip, numberOfPeople]);

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
                        <ButtonGroup activeId={tip.id}>
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
                            <Input id="custom" type="number" step="1" placeholder="Custom"></Input>
                        </ButtonGroup>
                    </FormInputGroup>
                    <FormInputGroup>
                        <InputLabel>Number of People</InputLabel>
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
                    <OutputGroup>
                        <OutputLabel>Tip Amount</OutputLabel>
                        <OutputValue>${tipAmount.toFixed(2)}</OutputValue>
                    </OutputGroup>
                    <OutputGroup>
                        <OutputLabel>Total</OutputLabel>
                        <OutputValue>${totalAmount.toFixed(2)}</OutputValue>
                    </OutputGroup>
                    <ResetButton disabled={!(billAmount || tip.percentage || numberOfPeople)} onClick={reset}>
                        Reset
                    </ResetButton>
                </Outputs>
            </Calculator>
        </Wrapper>
    );
}

export default App;
