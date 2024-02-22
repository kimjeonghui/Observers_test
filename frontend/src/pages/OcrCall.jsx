// import React, { useState } from 'react';
// import axios from 'axios';

// function Ocr() {
//   const [postResponse, setPostResponse] = useState('');
//   const [resultId, setResultId] = useState('');
//   const [getResponse, setGetResponse] = useState(null);
//   const [base64Image, setBase64Image] = useState('');
//   const [base64String, setBase64String] = useState('');

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setBase64Image(base64String);
//         setBase64String(base64String);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePostRequest = () => {
//     const apiUrl = process.env.REACT_APP_OCR_POST_URI;
//     const requestBody = {
//       base64Source: `${base64String.split(',')[1]}`,
//     };

//     axios
//       .post(apiUrl, requestBody, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Ocp-Apim-Subscription-Key': process.env.REACT_APP_OCP_KEY,
//         },
//       })
//       .then((response) => {
//         console.log('POST 요청 성공:', response.headers);

//         // 응답 헤더에서 operation-location 값을 추출
//         const operationLocation = response.headers['operation-location'];
//         if (operationLocation) {
//           const resultId = extractResultId(operationLocation);
//           console.log('추출된 operationId:', operationLocation);
//           setResultId(resultId);
//         } else {
//           console.warn('operation-location 헤더를 찾을 수 없습니다.');
//         }

//         setPostResponse('POST 요청 성공');
//       })
//       .catch((error) => {
//         console.error('POST 요청 실패:', error);
//         setPostResponse('POST 요청 실패');
//       });
//   };

//   const handleGetRequest = () => {
//     const apiUrl =
//       process.env.REACT_APP_OCR_GET_URI1 +
//       `${resultId}` +
//       process.env.REACT_APP_OCR_GET_URI2;

//     axios
//       .get(apiUrl, {
//         headers: {
//           'Ocp-Apim-Subscription-Key': process.env.REACT_APP_OCP_KEY,
//         },
//       })
//       .then((response) => {
//         console.log('GET 요청 성공:', response.data);
//         setGetResponse(response.data);
//       })
//       .catch((error) => {
//         console.error('GET 요청 실패:', error);
//       });
//   };

//   // operation-location에서 operationId를 추출하는 함수
//   const extractResultId = (location) => {
//     const regex = /\/([^\/?]+)\?/;
//     const match = location.match(regex);
//     return match ? match[1] : '';
//   };

//   return (
//     <div style={{ padding: '20px', display: 'flow', flexDirection: 'row' }}>
//       <input type='file' onChange={handleImageUpload} />

//       {base64Image && (
//         <div>
//           <img
//             src={base64Image}
//             style={{ height: '400px', width: '350px' }}
//             alt='Uploaded'
//           />
//         </div>
//       )}

//       <div>
//         <button onClick={handlePostRequest}>POST 요청 보내기</button>
//         <p>{postResponse}</p>
//         <p>{resultId}</p>
//       </div>

//       <button onClick={handleGetRequest}>GET 요청 보내기</button>
//       {getResponse && (
//         <div>
//           <h2>응답 데이터:</h2>
//           <pre>{JSON.stringify(getResponse, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Ocr;
