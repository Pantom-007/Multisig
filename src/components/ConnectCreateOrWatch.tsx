import { styled } from '@mui/material'
import { useAccounts } from '../contexts/AccountsContext'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './library'
import { WATCH_ACCOUNT_ANCHOR } from '../pages/Settings/Settings'
import { useWatchedAddresses } from '../contexts/WatchedAddressesContext'
import { useNetwork } from '../contexts/NetworkContext'

export const ConnectOrWatch = () => {
  const { isAllowedToConnectToExtension, allowConnectionToExtension } = useAccounts()
  const { watchedAddresses } = useWatchedAddresses()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { selectedNetwork } = useNetwork()

  return (
    <WrapperStyled>
      {isAllowedToConnectToExtension || watchedAddresses.length !== 0 ? (
        <div data-cy="label-no-multisig-found" className='text-lg'>
          No multisig found for your accounts or watched accounts on{' '}
          <NetworkNameStyled>{selectedNetwork}</NetworkNameStyled>.
        </div>
      ) : (
        <>
          <h1 data-cy="header-multix-introduction">
            Waiting for authorization from the extension
          </h1>
          <div data-cy="label-interaction-prompt">
            Connect a wallet to interact with multisig or watch an account.
          </div>
        </>
      )}
      <ButtonWrapperStyled>
        {isAllowedToConnectToExtension ? (
          <Button
            variant="primary"
            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' }, borderRadius: 1 }} 
            onClick={() => {
              navigate({
                pathname: '/create',
                search: createSearchParams(searchParams).toString()
              })
            }}
            data-cy="button-create-one"
          >
            Create
        </Button>
        ) : (
          <Button
            variant="primary"
            sx={{ borderRadius: 1 }} 
            onClick={allowConnectionToExtension}
            data-cy="button-connect-wallet"
          >
            Connect Wallet
          </Button>
        )}
        
        <Button
          sx={{ borderRadius: 1 }} 
          onClick={() => {
            navigate({
              pathname: '/settings',
              search: createSearchParams(searchParams).toString(),
              hash: WATCH_ACCOUNT_ANCHOR
            })
          }}
          data-cy="button-watch-account"
        >
          Watch account
        </Button>
      </ButtonWrapperStyled>
    </WrapperStyled>
  )
}

const WrapperStyled = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 22px;
  padding-top: 300px;
  h1 {
    text-align: center;
  }
`

const ButtonWrapperStyled = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  button {
    margin: 0 0.5rem;
  }
`

const NetworkNameStyled = styled('span')`
  text-transform: capitalize;
`