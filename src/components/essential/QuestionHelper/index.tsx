import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import { styled, Tooltip } from '@mui/material'

const QuestionWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.2rem',
  border: 'none',
  background: 'none',
  outline: 'none',
  cursor: 'default',
  borderRadius: '36px',
  backgroundColor: theme.palette.background.paper,
  color: '#828282',
  '&:hover, :focus': {
    opacity: 0.7
  }
}))

export default function QuestionHelper({ text, size = 14, title }: { text: string; size?: number; title?: any }) {
  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip title={text}>
        <QuestionWrapper>
          {title ? title : <HelpOutlineOutlinedIcon sx={{ height: size, width: size }} />}
        </QuestionWrapper>
      </Tooltip>
    </span>
  )
}
