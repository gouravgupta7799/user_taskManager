


export async function requestModule(url: any, method: any, body: any, headers: any) {

  console.log(url, method, body, headers)
  return await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers || { "Content-Type": "application/json" },
  });


}