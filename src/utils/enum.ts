
export enum UserRoles {
    USER ='user',
    ADMIN = 'admin',
    SUPER_ADMIN = 'super admin'
}

export enum TransactionType {
    SPEND ='Spend',
    SEND = 'Send',
    RECEIVE = 'Receive',
}

export enum TransactionStatus {
    SUCCESS ='success',
    PENDING = 'pending',
    FAILED = 'failed',
    CANCELLED = 'canceled',
    REVERSED = 'reversed'
}