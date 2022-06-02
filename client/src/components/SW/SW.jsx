import { useEffect, useContext } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

import { AlertContext } from '@/context/alert/AlertContext'

const SW = () => {
  const { setAlert } = useContext(AlertContext)
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      setAlert('SW Registered!')
      r &&
        setInterval(() => {
          r.update()
        }, intervalMS)
    },
    onRegisterError(err) {
      setAlert('SW Registration Error!')
      console.log('SW Registration ERROR', err)
    },
  })

  const intervalMS = 60 * 60 * 1000

  const closeNotification = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  useEffect(() => {
    // Display Alert bar when site is offline ready or when ServiceWorker needs to be refreshed. then update ServiceWorker accordingly.
    if (offlineReady) {
      setAlert('Mango Planner is offline ready now')
    } else if (needRefresh) {
      updateServiceWorker(true)
      setAlert('Content update needed.')
    } else {
      closeNotification()
    }
  }, [needRefresh, offlineReady])

  return null
}

export default SW
