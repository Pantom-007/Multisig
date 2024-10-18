import {
  HiOutlineArrowTopRightOnSquare as LaunchIcon,
  HiOutlineExclamationCircle as ErrorOutlineIcon
} from 'react-icons/hi2'

import { styled } from '@mui/material/styles'
import { useAccounts } from '../contexts/AccountsContext'
import { Button, Link } from '../components/library'
import { Center } from '../components/layout/Center'
import { useWatchedAddresses } from '../contexts/WatchedAddressesContext'
import { useMultiProxy } from '../contexts/MultiProxyContext'
import { useSearchParams } from 'react-router-dom'
import { useNetwork } from '../contexts/NetworkContext'

export const useDisplayError = () => {
  const { isExtensionError, isAccountLoading, ownAccountList, isAllowedToConnectToExtension } =
    useAccounts()
  const { watchedAddresses } = useWatchedAddresses()
  const { error: multisigQueryError, refetch, canFindMultiProxyFromUrl } = useMultiProxy()
  const [, setSearchParams] = useSearchParams()
  const { selectedNetwork } = useNetwork()

  if (
    watchedAddresses.length === 0 &&
    !isAccountLoading &&
    (isExtensionError || (isAllowedToConnectToExtension && ownAccountList.length === 0))
  ) {
    return (
      <CenterStyled>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '60px', height: '60px' }} viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fill-rule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5c-.074.074-.144.15-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428.75.75 0 0 1 .646-1.353 5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5.31 5.31 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304ZM5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0Zm2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354 5.244 5.244 0 0 1-1.449-1.026 5.232 5.232 0 0 1-1.24-1.965.75.75 0 0 1 .46-.957Z" clip-rule="evenodd" />
        </svg>
        <div data-cy="label-no-account-found" className='text-lg mt-10'>
          No account found. Please connect at least one in a wallet extension. 
          <br />
          <Link 
            href="https://chromewebstore.google.com/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn" 
            target="_blank"
            onClick={refetch}
            style= {{ fontSize: '16px', marginTop:'20px', color:'green' }} 
          >
            Polkadot extension download
          </Link>
          </div>
      </CenterStyled>
    )
  }

  if (multisigQueryError) {
    return (
      <CenterStyled>
        <ErrorMessageStyled>
          <ErrorOutlineIcon size={64} />
          <div>Connection timed out.</div>
          <Button onClick={refetch}>Reconnect</Button>
        </ErrorMessageStyled>
      </CenterStyled>
    )
  }

  if (!canFindMultiProxyFromUrl) {
    return (
      <CenterStyled>
        <ErrorMessageStyled>
          <ErrorOutlineIcon size={64} />
          <div data-cy="label-linked-address-not-found">
            The linked address can&apos;t be found in your accounts or watched accounts on{' '}
            <NetworkNameStyled>{selectedNetwork}</NetworkNameStyled>.
          </div>
          <Button
            data-cy="button-reset-linked-address"
            onClick={() =>
              setSearchParams((prev) => {
                prev.delete('address')
                return prev
              })
            }
          >
            Back to Home
          </Button>
        </ErrorMessageStyled>
      </CenterStyled>
    )
  }

  return null
}

const Linkstyled = styled(Link)`
  display: inline-flex;
  padding-left: 0.2rem;
  align-items: center;

  .launchIcon {
    margin-left: 0.5rem;
  }
`

const CenterStyled = styled(Center)`
  text-align: center;
  font-size: 20px;
  margin-top:200px;
`

const ErrorMessageStyled = styled('div')`
  text-align: center;
  margin-top: 1rem;

  button {
    margin-top: 1rem;
  }
`

const NetworkNameStyled = styled('span')`
  text-transform: capitalize;
`
