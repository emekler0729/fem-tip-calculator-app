import styled from "styled-components";
import React, { useState } from "react";
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

/* STYLING */
const borderRadiusSmall = "5px";

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

const Label = styled.label`
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
    left: "12px",
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
    padding: 0 12px;
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

const Outputs = styled.div`
    background-color: ${colorNeutralCyanDark3};
`;

const OutputGroup = styled.div``;

function App() {
    const [billAmount, setBillAmount] = useState("");

    function onBillChange(event) {
        event.preventDefault();
        // @TODO add input validation
        setBillAmount(event.target.value);
    }

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
                        <Label htmlFor="bill">Bill</Label>
                        <InputWrapper>
                            <DollarIcon style={IconStyle} />
                            <Input
                                id="bill"
                                type="number"
                                step="0.01"
                                placeholder="0"
                                value={billAmount}
                                onChange={onBillChange}
                            ></Input>
                        </InputWrapper>
                    </FormInputGroup>
                    <FormInputGroup>
                        <Label>Select Tip %</Label>
                    </FormInputGroup>
                    <FormInputGroup>
                        <Label>Number of People</Label>
                        <InputWrapper>
                            <PersonIcon style={IconStyle} />
                            <Input id="people" type="number" step="1" placeholder="0"></Input>
                        </InputWrapper>
                    </FormInputGroup>
                </Inputs>
                <Outputs>
                    <OutputGroup></OutputGroup>
                </Outputs>
            </Calculator>
        </Wrapper>
    );
}

export default App;
