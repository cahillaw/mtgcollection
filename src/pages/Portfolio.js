import React from 'react'
import { useAuth } from "../contexts/AuthContext"

export default function Portfolio() {
    const { currentUser } = useAuth()
    return (
        <div>
            {JSON.stringify(currentUser, null, 2)}
        </div>
    )
}
