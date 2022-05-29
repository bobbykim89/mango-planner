import React, { useEffect, useContext } from 'react'
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
      console.log(`SW Registered ${r}`)
    },
    onRegisterError(error) {
      console.log('SW Registration ERROR', error)
    },
  })

  useEffect(() => {
    console.log('offline ready', offlineReady)
    console.log('need refresh', needRefresh)
    if (offlineReady) {
      setAlert('Mango Planner is offline ready now')
    } else if (needRefresh) {
      updateServiceWorker(true)
      setAlert('Content update needed.')
    }
  }, [needRefresh, offlineReady, updateServiceWorker])

  return null
}

export default SW
