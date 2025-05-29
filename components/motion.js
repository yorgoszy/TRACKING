// Απλοποιημένη έκδοση του framer-motion για το project μας
// Σε πραγματικό project θα χρησιμοποιούσαμε το πλήρες πακέτο

export const motion = {
  div: (props) => {
    const { children, ...rest } = props
    return <div {...rest}>{children}</div>
  },
  span: (props) => {
    const { children, ...rest } = props
    return <span {...rest}>{children}</span>
  },
  button: (props) => {
    const { children, ...rest } = props
    return <button {...rest}>{children}</button>
  },
  // Προσθέστε περισσότερα components όπως χρειάζεται
}
