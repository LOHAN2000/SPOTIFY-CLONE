import { useLocation } from "react-router-dom"

export const Collection = () => {

  const { pathname } = useLocation();

  const isAlbumPage = pathname.includes('/album');
  const isPlaylistPage = pathname.includes('/playlist');

  console.log(isAlbumPage, isPlaylistPage)

  return (
    <div>Collection</div>
  )
}
