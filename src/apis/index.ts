// @ts-igonre
const files: Record<string, any> = import.meta.globEager('../apis/**/*.ts')
let Apis: any = {}
const excludeFileNames: string = 'apis/index.ts'
Object.keys(files).forEach((c: string) => {
  if (!c.endsWith(excludeFileNames)) {
    Apis = { ...Apis, ...files[c] }
  }
})
export default Apis