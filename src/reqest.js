const noop = () => { };
const no_params = {};
const no_headers = {};

function request({
    method = 'GET',
    url,
    body = '',
    params = no_params,
    successeCodes = [200],
    headers = no_headers,
    responseType = 'json',
    requestType = 'json',
    onSuccess = noop,
    onError = noop
}) {
    const req = new XMLHttpRequest();
    const urlParams = new URLSearchParams(params);
    let endPoint = urlParams.toString();
    req.open(method, url + (endPoint ? `?${endPoint}` : ''));
    Object.keys(headers).forEach((header) => {
        req.setRequestHeader(header, headers[header]);
    });
    req.responseType = responseType;
    req.onload = function (event) {
        const target = event.target;
        if (!successeCodes.includes(target.status)) {
            onError(target.statusText);
            return;
        }
        onSuccess(target.response);
    }
    req.onerror = function () {
        onError('bad_Server');
    }
    let dataBody = body;
    if (requestType === 'urlencoded') {
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        dataBody = new URLSearchParams(body).toString();
    }
    req.send(dataBody);
}