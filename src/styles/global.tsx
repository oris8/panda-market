import { createGlobalStyle } from "styled-components";
import PretendardThin from "../assets/fonts/Pretendard-Thin.woff";
import PretendardLight from "../assets/fonts/Pretendard-Light.woff";
import PretendardRegular from "../assets/fonts/Pretendard-Regular.woff";
import PretendardMedium from "../assets/fonts/Pretendard-Medium.woff";
import PretendardBold from "../assets/fonts/Pretendard-Bold.woff";

const GlobalStyle = createGlobalStyle`
:root {
  --color-blue: #3692ff;
  --color-red: #f74747;
  --color-gray-50: #f7f7f8;
  --color-gray-100: #e8ebed;
  --color-gray-200: #e5e7eb;
  --color-gray-400: #9ea4a8;
  --color-gray-500: #72787f;
  --color-gray-600: #454c53;
  --color-gray-800: #26282b;
  --color-gray-900: #1b1d1f;
  --color-cool-gray-100: #f3f4f6;
  --color-cool-gray-200: #E5E7EB;
  --color-cool-gray-400: #9ca3af;
  --color-cool-gray-500: #6b7280;
  --color-cool-gray-600: #4b5563;
  --color-cool-gray-800: #1f2937;
}

button i {
  pointer-events: none;
}

.hidden {
  display: none !important;
}


@font-face {
  font-family: "Pretendard";
  src: url(${PretendardThin}) format("woff");
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Pretendard";
  src: url(${PretendardLight}) format("woff");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Pretendard";
  src: url(${PretendardRegular}) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Pretendard";
  src: url(${PretendardMedium}) format("woff");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Pretendard";
  src: url(${PretendardBold}) format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;  
  box-sizing: border-box;
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
  Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
  "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  sans-serif ;
}

html {
  font-size: 10px;
}

body {
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    sans-serif ;
  font-weight: 400;
  box-sizing: border-box;
  overflow-x: hidden;
  
}

html, 
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  text-decoration: none;
  color: inherit;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* input 기본 스타일 초기화 */
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  border: none;
}

input:focus {
  outline: none;
}

/* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
input::-ms-clear {
  display: none;
}

/* input type number 에서 화살표 제거 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

/* Select box 스타일 초기화 */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* IE 에서 Select box 화살표 제거 */
select::-ms-expand {
  display: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* IE에서 비밀번호 보이기/숨기기 눈 없애기 */

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

/* 버튼 초기화 */
button {
  outline: none;
  border: none;
  cursor: pointer;
}

i {
 display: block;
  width: 24px;
  height: 24px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
`;

export default GlobalStyle;
