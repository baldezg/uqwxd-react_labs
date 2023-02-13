const increment = (val) => {
    return {
        type : 'INCREMENT',
        inc : val
    }
}

export default increment;

// val é o valor que deseja-se aumentar 