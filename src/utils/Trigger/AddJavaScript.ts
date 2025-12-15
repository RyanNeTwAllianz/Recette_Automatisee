const AddJavaScript = async (script: string): Promise<void> => {
    try {
        await eval(script)
    } catch (e) {
        console.log('Error while executing CUSTOM FUNCTION', { e })
    }
}

export default AddJavaScript
