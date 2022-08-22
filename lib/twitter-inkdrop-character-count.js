'use babel'

import React from 'react'
import { useModal } from 'inkdrop'

function TwitterCharacterCountMessageDialog() {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const [count, setCount] = React.useState(undefined)

  function toggle() {
    if (!modal.state.visible) {
      const editor = inkdrop.getActiveEditor()
      const { cm } = editor
      const text = cm.getSelection()

      if (text) {
        const newCount = text.length
        setCount(newCount)
        modal.show()
      }
    } else {
      modal.close()
    }
  }

  React.useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'twitter-character-count:toggle': toggle
    })
    return () => sub.dispose()
  }, [toggle])

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Content className="twitter-character-count">
        {count < 280 && (
          <strong className="can-twitter">You can tweet this!</strong>
        )}
        {count > 280 && (
          <>
            <p>
              <span className="cannot-twitter">You cannot tweet this.</span>
            </p>
            <p>
              <strong>{count}</strong> characters selected.
            </p>
          </>
        )}
      </Dialog.Content>
    </Dialog>
  )
}

module.exports = {
  activate() {
    inkdrop.components.registerClass(TwitterCharacterCountMessageDialog)
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'TwitterCharacterCountMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'TwitterCharacterCountMessageDialog'
    )
    inkdrop.components.deleteClass(TwitterCharacterCountMessageDialog)
  }
}
