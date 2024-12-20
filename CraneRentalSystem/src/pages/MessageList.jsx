import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// This component renders a list of chat messages.
export function MessageList({ messages }) {
    return (
        <div className="flex flex-col gap-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                    {message.sender === 'support' && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>CS</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`rounded-lg px-3 py-2 max-w-[80%] ${message.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                    >
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    )
}
