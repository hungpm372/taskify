/**
 * @author Phan Minh Hung
 * @email hungpm372@gmail.com
 * @create date 2024-04-29 17:43:29
 * @modify date 2024-04-29 17:43:29
 * @desc I am a student of information technology
 * @github https://github.com/hungpm372
 */

const ListWrapper = ({ children }: { children: React.ReactNode }) => {
  return <li className='shrink-0 h-full w-[272px] select-none'>{children}</li>
}

export default ListWrapper
