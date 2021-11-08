import styled from "styled-components";
import React, { useState } from "react";
import { ReactComponent as DollarIcon } from "./images/icon-dollar.svg";

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

const FormInputGroup = styled.div``;

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

const IconStyle = {
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)",
    color: "red",
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
    border-radius: 5px;
    color: ${colorNeutralCyanDark1};
    font-weight: bold;

    &:focus-visible {
        outline-color: ${colorPrimary};
    }

    &::placeholder {
        color: ${colorNeutralCyanDark3};
    }
`;

function App() {
    return (
        <Wrapper>
            <Title>
                Spli
                <br />
                tter
            </Title>
            <Calculator>
                <form>
                    <FormInputGroup>
                        <Label>Bill</Label>
                        <InputWrapper>
                            <DollarIcon style={IconStyle} />
                            <Input type="number" step="0.01" placeholder="0"></Input>
                        </InputWrapper>
                    </FormInputGroup>
                </form>
            </Calculator>
        </Wrapper>
    );
}

export default App;
