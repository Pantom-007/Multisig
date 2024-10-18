import { styled } from '@mui/material/styles'
import { Box, CircularProgress } from '@mui/material'

interface Props {
  message: string
  testId?: string
}

const LoadingBox = ({ message, testId }: Props) => (
  <MessageBox data-cy={`loader-${testId}`}>
    <CircularProgress color='success' />
    <div>{message}</div>
  </MessageBox>
)

export const MessageBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin-top: 300px;
  gap : 5px;
`

export default LoadingBox
