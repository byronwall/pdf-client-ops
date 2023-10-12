# PDF Client Side

## Migration from T3 Stack

1. Remove prisma - no database
2. Remove `postinstall` script that ran prisma
3. Clear out extra pages in `app` - keep just the root
4. Remove extra comps - keep
   1. ui
   2. common
   3. Table
   4. nav
5. Remove trpc and auth from the `pages/api` - do not need for client only
6. Delete most lib related stuff - keep
   1. Non finance helpers
   2. utils
7. Delete the `server` folder and all of its code
