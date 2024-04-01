
export enum UserRoles {
    USER ='user',
    ADMIN = 'admin',
    SUPER_ADMIN = 'super admin'
}

export enum TransactionType {
    DEPOSIT ='deposit',
    WITHRAW = 'withdraw',
    TRANSFER = 'transfer',
    PAYMENT = 'payment' //e.g for utility payment
}

export enum TransactionStatus {
    SUCCESS ='success',
    PENDING = 'pending',
    FAILED = 'failed',
    CANCELLED = 'canceled',
    REVERSED = 'reversed'
}