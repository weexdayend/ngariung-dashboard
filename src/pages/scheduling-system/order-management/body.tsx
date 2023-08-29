import React, { useState } from 'react'
import Welcome from './welcome'

type Props = {
  data: any
}

function Body({ data }: Props) {

  return (
    <div>
      <Welcome data={data} />
    </div>
  )
}

export default Body