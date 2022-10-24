# Shoping-list
### Simple App that lets you create shopping lists and add friends and family so they can see what you need 

## TODO
- [x] link users list to db
- [x] create multiple lists
  - [x] create list element 
  - [x] connect user to multiple lists 
    - [x] fetch users lists on initial load
    - [x] update users lists on add delete update 
    - [x] delete users lists only if current user is its creator
  - [x] create list row on db
- [ ] add people to lists
- [x] make lists update on any db change
- [ ] notify user on anyone is added or someone joins (new item is added (?)) 
- [ ] let lists owner kick people from lists
- [ ] create push notifications when someone invites you to list
- [x] refactor code and create hook to make changes to db
- [x] make hook to listen to live changes