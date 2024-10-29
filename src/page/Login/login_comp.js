 import styled from 'styled-components';

 export const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: #fff;
 border-radius: 10px;
 box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
 position: relative;
 overflow: hidden;
 width: 700px;
 max-width: 100%;
 min-height: 500px;
 margin: auto;
`;

 export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` 
  : null}
 `;
 

 export const SignInContainer = styled.div`
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;

 z-index: 2;
 ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
 `;
 
 export const Form = styled.form`
 background-color: #ffffff;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 padding: 0 60px;
 height: 100%;
 text-align: center;
`;

 export const Title = styled.h1`
 font-weight: bold;
 margin: 0;
 `;
 
 export const Input = styled.input`
 background-color: #eee;
 border: none;
 padding: 12px 15px;
 margin: 10px 0;
 width: 100%;
 transition: all 0.3s ease-in-out;
 
 &:required {
   border-left: 3px solid #F49867;
 }
 
 &:focus {
   background-color: #fff;
   border-left: none;
   border-bottom: 3px solid #F49867;
   transition: all 0.1s ease-in;
   outline: none;
 }
`;

export const PasswordInputContainer = styled.div`
 position: relative;
 width: 100%;
`;

export const PasswordToggle = styled.button`
 position: absolute;
 right: 10px;
 top: 50%;
 transform: translateY(-50%);
 background: none;
 border: none;
 cursor: pointer;
 font-size: 14px;
 color: #333;
`;

export const Button = styled.button`
 border-radius: 25px;
 border: none;
 background: -webkit-linear-gradient(to right, rgba(0, 40, 83, 1), rgba(4, 12, 24, 1));
 background: linear-gradient(to right,  rgba(4, 12, 24, 1), #81AFDD);
 background-repeat: no-repeat;
background-size: cover;
 color: #ffffff;
 font-size: 14px;
 font-weight: bold;
 padding: 14px 50px;
 letter-spacing: 1px;
 text-transform: uppercase;
 transition: all 0.3s ease-in-out;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 
 &:hover {
   transform: translateY(-2px);
   box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
 }
 
 &:active {
   transform: translateY(0);
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }
 
 &:focus {
   outline: none;
 }
 
 cursor: pointer;
`;

export const GhostButton = styled(Button)`
 background: transparent;
 border: 2px solid #ffffff;
 
 &:hover {
   background: rgba(255, 255, 255, 0.1);
 }
`;
 export const Anchor = styled.a`
 color: #333;
 font-size: 14px;
 text-decoration: none;
 margin: 15px 0;
 `;
 export const OverlayContainer = styled.div`
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;
${props =>
  props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
background: #042c54;
background: -webkit-linear-gradient(to right, rgba(0, 40, 83, 1), rgba(4, 12, 24, 1));
background: linear-gradient(to right,  rgba(4, 12, 24, 1), #81AFDD);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;
 
 export const OverlayPanel = styled.div`
     position: absolute;
     display: flex;
     align-items: center;
     justify-content: center;
     flex-direction: column;
     padding: 0 40px;
     text-align: center;
     top: 0;
     height: 100%;
     width: 50%;
     transform: translateX(0);
     transition: transform 0.6s ease-in-out;
 `;

 export const LeftOverlayPanel = styled(OverlayPanel)`
   transform: translateX(-20%);
   ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
 `;

 export const RightOverlayPanel = styled(OverlayPanel)`
     right: 0;
     transform: translateX(0);
     ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
 `;
 
 export const SignUpButton = styled(Button)`
 margin-top: 20px;
`;
 export const Paragraph = styled.p`
 font-size: 14px;
   font-weight: 100;
   line-height: 20px;
   letter-spacing: 0.5px;
   margin: 20px 0 30px
 `;