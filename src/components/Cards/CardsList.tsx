import { DefaultCard } from './DefaultCard/DefaultCard'
import style from './CardList.module.css'

export const CardList = () => {
  return (
    <div className={style['containerCardsList']}>
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
      <DefaultCard />
    </div>
  )
}
