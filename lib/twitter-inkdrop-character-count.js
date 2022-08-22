'use babel'

import React from 'react'
import { useModal } from 'inkdrop'

function HighlightWordcountMessageDialog() {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const [count, setCount] = React.useState(undefined)

  function toggle() {
    if (!modal.state.visible) {
      const editor = inkdrop.getActiveEditor()
      const { cm } = editor
      const text = cm.getSelection()

      if (text) {
        const newCount = text.split(/\s+/).length
        setCount(newCount)
        modal.show()
      }
    } else {
      modal.close()
    }
  }

  React.useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'highlight-wordcount:toggle': toggle
    })
    return () => sub.dispose()
  }, [toggle])

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Content className="highlight-wordcount">
        <strong>{count}</strong> words selected.
      </Dialog.Content>
    </Dialog>
  )
}

module.exports = {
  activate() {
    inkdrop.components.registerClass(HighlightWordcountMessageDialog)
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'HighlightWordcountMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'HighlightWordcountMessageDialog'
    )
    inkdrop.components.deleteClass(HighlightWordcountMessageDialog)
  }
}
