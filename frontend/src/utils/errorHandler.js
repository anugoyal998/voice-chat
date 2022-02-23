const errorHandler = async (fn,err)=> {
    try {
        await fn()
    } catch (error) {
        console.log(error, err)
    }
}

export default errorHandler