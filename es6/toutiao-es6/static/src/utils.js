



/**
 * @desc 网络请求封装，项目内请走这个封装
 * @param {Object} [param] - 发请求用的参数
 * @return {Promise} 请求的Promise任务对象
 */
export const request = params => {
    // params.methods 
    let requestParams = {
        ...params,
        methods: (params.method && params.method.toUpperCase()) || 'GET'
    }
    return fetch(
            requestParams.url,
            requestParams
        )
        .then(res => res.json())
}