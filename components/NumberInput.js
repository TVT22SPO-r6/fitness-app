import {useState} from 'react'
import { TextInput, HelperText } from 'react-native-paper'

const NumericTextInput = ({label, onNumChange, minVal, maxVal}) => {
  const [text, setText] = useState('')
  
  const [error, setError] = useState('')

  const handleTextChange = newText => {
    setText(newText)
  }

  const handleBlur = () => {
    // Validation: Check if the input is a valid number between 0 and 200
    const num = parseFloat(text.replace(',', '.')); // Replace commas with dots for consistency
    if (isNaN(num) || num < minVal || num > maxVal) {
      setError(`Number must be between ${minVal} and ${maxVal}`)
    } else {
      setError('')
      onNumChange(num)
    }
  }

  return (
    <>
        <TextInput
            label={label}
            value={text}
            onChangeText={handleTextChange}
            onBlur={handleBlur}
            keyboardType="numeric"
        />
        <HelperText type="error" visible={error !== ''}>
            {error}
        </HelperText>
    </>
  )
}

export default NumericTextInput