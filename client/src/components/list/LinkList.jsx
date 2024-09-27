import React from 'react'
import NavLink from '../common/NavLink'

export default function LinkList({ data }) {
  return (
    data.map((link, index) => (
      <NavLink
        key={`${index}-${link.label}`}
        label={link.label}
        path={link.path}
      />
    ))
  )
}
