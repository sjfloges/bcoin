export default [
  {
    title: 'Dashboard',
    pathName: 'Dashboard',
    accessible: true,
    activeWhen: ['Dashboard'],
  },
  {
    title: 'Deposit',
    pathName: 'DepositList',
    accessible: true,
    activeWhen: [
      'DepositList',
      'DepositNew',
      'DepositSuccess',
      'DepositInstructions',
      'DepositConfirmation',
    ],
  },
  {
    title: 'Transfer',
    pathName: 'TransferList',
    accessible: true,
    activeWhen: [
      'TransferList',
      'TransferBeneficiary',
      'TransferAmount',
      'TransferConfirm',
      'TransferSuccess',
    ],
  },
  {
    title: 'Withdraw',
    pathName: 'WithdrawList',
    accessible: true,
    activeWhen: [
      'WithdrawList',
      'WithdrawNew',
      'WithdrawConfirm',
      'WithdrawSuccess',
    ],
  },
  {
    title: 'Receive',
    pathName: '',
    accessible: false,
    activeWhen: [''],
  },
  {
    title: 'Reports',
    pathName: '',
    accessible: false,
    activeWhen: [''],
  },
  {
    title: 'Support',
    pathName: '',
    accessible: false,
    activeWhen: [''],
  },
]
