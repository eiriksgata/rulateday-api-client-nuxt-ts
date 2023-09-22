
export const hexString2uint8Array = (sendData: string): Uint8Array => {
  if (sendData.length % 2 == 1) {
    throw new Error("16进制字符串长度不符合要求");
  }
  const buf = new ArrayBuffer(sendData.length / 2);
  const dataView = new DataView(buf);
  for (let i = 0; i < sendData.length / 2; i++) {
    dataView.setUint8(i, parseInt(sendData.substring(i * 2, i * 2 + 2), 16));
  }
  return new Uint8Array(buf, 0, buf.byteLength);
}


export const removeArrayItemByValue = function (array: Array<string>, value: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
}
