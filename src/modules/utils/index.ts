export function promisify(data: any, isReject = false) {
    return new Promise((resolve, reject) => {
        if (isReject) {
            reject(data);
        }
        resolve(data);
    });
}
