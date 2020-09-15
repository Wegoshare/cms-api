db.group.insertOne(
   { _id: "56fc40f9d735c28df206d078", name: "admin", description: "admin"}
)

db.user.insertOne(
   {  login: 'admin',
        passHash: '9e5e42b773ae294dc5115931fa2357b3bf100e8a',
        isVerified: true,
        groupId: "56fc40f9d735c28df206d078"
    }
)
