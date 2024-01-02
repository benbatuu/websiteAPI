import pc from '../src/helpers/prismaclient.singleton';

const permissionsList = [
    {
        id: 1,
        name: 'Ayarlar Sayfası',
        value: 'settings:view',
        group: 'settings',
        description: 'Kullanıcıya ayarlar sayfasını görme yetkisi verir.',
    },
    {
        id: 2,
        name: 'Yetki Listesi',
        value: 'permission:view',
        group: 'permission',
        description: 'Yetki listesini görüntüleme yetkisi verir.',
    },
    {
        id: 3,
        name: 'Yetki Oluşturma',
        value: 'permission:create',
        group: 'permission',
        description: 'Yeni yetki oluşturma yetkisi verir.',
    },
    {
        id: 4,
        name: 'Yetki Güncelleme',
        value: 'permission:update',
        group: 'permission',
        description: 'Varolan yetki bilgilerini güncelleme yetkisi verir.',
    },
    {
        id: 4,
        name: 'Yetki Silme',
        value: 'permission:delete',
        group: 'permission',
        description: 'Seçilen yetkiyi silme yetkisi verir.',
    },
    {
        id: 5,
        name: 'Rol Listesi',
        value: 'role:view',
        group: 'role',
        description: 'Rol listesini görüntüleme yetkisi verir.',
    },
    {
        id: 6,
        name: 'Rol Oluşturma',
        value: 'role:create',
        group: 'role',
        description: 'Yeni rol oluşturma yetkisi verir.',
    },
    {
        id: 7,
        name: 'Rol Güncelleme',
        value: 'role:update',
        group: 'role',
        description: 'Varolan rol bilgilerini güncelleme yetkisi verir.',
    },
    {
        id: 8,
        name: 'Rol Silme',
        value: 'role:delete',
        group: 'role',
        description: 'Seçilen rolü silme yetkisi verir.',
    },

    {
        id: 9,
        name: 'Giriş/Çıkış Yetkisi',
        value: 'entrance:create',
        group: 'entrance',
        description: "Kullanıcıya ofis'e giriş çıkış yetkisi verir.",
    },
    {
        id: 10,
        name: 'Kullanıcı Listesi',
        value: 'user:view',
        group: 'user',
        description: 'Kullanıcı listesini görüntüleme yetkisi verir.',
    },
    {
        id: 11,
        name: 'Kullanıcı Oluşturma',
        value: 'user:create',
        group: 'user',
        description: 'Yeni kullanıcı oluşturma yetkisi verir.',
    },

    {
        id: 12,
        name: 'Kullanıcı Güncelleme',
        value: 'user:update',
        group: 'user',
        description: 'Varolan kullanıcı bilgilerini güncelleme yetkisi verir.',
    },

    {
        id: 13,
        name: 'Kullanıcı Oluşturma',
        value: 'Kullanıcı Silme',
        group: 'user',
        description: 'Seçilen kullanıcıyı silme yetkisi verir.',
    },

    {
        id: 14,
        name: 'Kullanıcı Arşivleme / Aktifleme',
        value: 'user:changestatus',
        group: 'user',
        description: 'Seçilen kullanıcıyı arşivleme ve aktif etme yetkisi verir.',
    },
    {
        id: 15,
        name: 'Anasayfa',
        value: 'dashboard:view',
        group: 'dashboard',
        description: 'Kullanıcıya anasayfayı görme yetkisi verir.',
    },
    {
        id: 16,
        name: 'Kategori Görüntüleme',
        value: 'category:view',
        group: 'sports',
        description: 'Spor kategorilerini görüntüleme yetkisi verir.',
    },
    {
        id: 17,
        name: 'Kategori Ekleme',
        value: 'category:create',
        group: 'sports',
        description: 'Kullanıcıya yeni kategori ekleme yetkisi verir.',
    },
    {
        id: 18,
        name: 'Kategori Düzenleme',
        value: 'category:edit',
        group: 'sports',
        description: 'Kullanıcıya sport kategori bilgilerini düzenleme yetkisi verir.',
    },
    {
        id: 19,
        name: 'Kategori Stataus Değiştirme',
        value: 'category:changestatus',
        group: 'sports',
        description: 'Kullanıcıya sport kategorilerini statüslerini değiştirme yetkisi verir.',
    },
    {
        id: 20,
        name: 'Takım Görüntüleme',
        value: 'team:view',
        group: 'sports',
        description: 'Kullanıcıya takımları görüntüleme yetkisi verir.',
    },
    {
        id: 21,
        name: 'Takım Ekleme',
        value: 'team:create',
        group: 'sports',
        description: 'Kullanıcıya takım ekleme yetkisi verir.',
    },
    {
        id: 22,
        name: 'Takım Düzenleme',
        value: 'team:edit',
        group: 'sports',
        description: 'Kullanıcıya takım bilgilerini düzenleme yetkisi verir.',
    },
    {
        id: 23,
        name: 'Takımı Pasife Alma',
        value: 'team:passive',
        group: 'sports',
        description: 'Kullanıcıya takımlarını pasife alma yetkisi verir.',
    },
    {
        id: 24,
        name: 'Takımı Aktifleştirme',
        value: 'team:active',
        group: 'sports',
        description: 'Kullanıcıya takımlarını aktifleştirme yetkisi verir.'
    },
    {
        id: 25,
        name: 'Hakem Görüntüleme',
        value: 'referee:view',
        group: 'sports',
        description: 'Kullanıcıya hakemleri görüntüleme yetkisi verir.'
    },
    {
        id: 26,
        name: 'Hakem Ekleme',
        value: 'referee:create',
        group: 'sports',
        description: 'Kullanıcıya hakem ekleme yetkisi verir.'
    },
    {
        id: 27,
        name: 'Hakem Düzenleme',
        value: 'referee:edit',
        group: 'sports',
        description: 'Kullanıcıya hakem bilgilerini düzenleme yetkisi verir.'
    },
    {
        id: 28,
        name: 'Maçları Görüntüleme',
        value: 'match:view',
        group: 'sports',
        description: 'Kullanıcıya maçları görüntüleme yetkisi verir.',
    },
    {
        id: 29,
        name: 'Maç Ekleme',
        value: 'match:create',
        group: 'sports',
        description: 'Kullanıcıya maç ekleme yetkisi verir.'
    },
    {
        id: 30,
        name: 'Maç Düzenleme',
        value: 'match:edit',
        group: 'sports',
        description: 'Kullanıcıya maç bilgilerini düzenleme yetkisi verir.'
    },
    {
        id: 31,
        name: 'Maçı Pasife Alma',
        value: 'match:passive',
        group: 'sports',
        description: 'Kullanıcıya maçları pasife alma yetkisi verir.'
    },
    {
        id: 32,
        name: 'Maçı Aktifleştirme',
        value: 'match:active',
        group: 'sports',
        description: 'Kullanıcıya maçları aktifleştirme yetkisi verir.'
    },
    {
        id: 33,
        name: 'Stadyum Görünütüleme',
        value: 'stadium:view',
        group: 'sports',
        description: 'Kullanıcıya stadyumları görüntüleme yetkisi verir.',
    },
    {
        id: 34,
        name: 'Stadyum Ekleme',
        value: 'stadium:create',
        group: 'sports',
        description: 'Kullanıcıya stadyum ekleme yetkisi verir.'
    },
    {
        id: 35,
        name: 'Stadyum Düzenleme',
        value: 'stadium:edit',
        group: 'sports',
        description: 'Kullanıcıya stadyum bilgilerini düzenleme yetkisi verir.'
    },
    {
        id: 36,
        name: 'Bet Görüntüleme',
        value: 'bets:view',
        group: 'sports',
        description: 'Kullanıcıya bahisleri görüntüleme yetkisi verir.'
    },
    {
        id: 37,
        name: 'Bet Ekleme',
        value: 'bets:create',
        group: 'sports',
        description: 'Kullanıcıya bahis ekleme yetkisi verir.'
    },
    {
        id: 38,
        name: 'Bet Düzenleme',
        value: 'bets:edit',
        group: 'sports',
        description: 'Kullanıcıya bahis bilgilerini düzenleme yetkisi verir.'
    },
    {
        id: 39,
        name: 'Odds Görüntüleme',
        value: 'odds:view',
        group: 'sports',
        description: 'Kullanıcıya oranları görüntüleme yetkisi verir.'
    },
    {
        id: 40,
        name: 'Odds Ekleme',
        value: 'odds:create',
        group: 'sports',
        description: 'Kullanıcıya oran ekleme yetkisi verir.'
    },
    {
        id: 41,
        name: 'Odds Düzenleme',
        value: 'odds:edit',
        group: 'sports',
        description: 'Kullanıcıya oran bilgilerini düzenleme yetkisi verir.'
    },
    {
        id: 42,
        name: 'Bet Statüs Değiştirme',
        value: 'bets:changestatus',
        group: 'sports',
        description: 'Kullanıcıya bahis statüslerini değiştirme yetkisi verir.'
    }
];

const roleList = [
    { name: 'Yönetici', value: '1', },
    { name: 'Kullanıcı', value: '2', }
];

async function main() {

    // Create User Seed
    await pc.user.create({
        data:{
            id:1,
            firstname: 'Batuhan',
            lastname: 'Küçük',
            email: 'bennbatuu@gmail.com',
            password: '123456',
            phone: '5414725820',
            createdat: new Date(),
            createdby: 1,
        }
    });

    // Create Role Seed
    Promise.all(
        roleList.map((n) =>
            pc.role.createMany({
                data: {
                    name: n.name,
                    createdat: new Date(),
                    createdby: 1,
                },
            })
        )
    );

    // Create User Role Seed
    await pc.userrole.create({
        data: {
            userid: 1,
            roleid: 1,
            createdat: new Date(),
            createdby: 1,
        },
    });

    // Create API Client Seed
    await pc.apiclient.create({
        data: {
            name: 'Test Api Client',
            key: 'test',
            secret: 'test',
            type: 1,
            createdat: new Date(),
            createdby: 1,
            isactive: true,
        },
    });

    // Create Permissions Seed
    Promise.all(
        permissionsList.map((n) =>
            pc.permission.createMany({
                data: {
                    name: n.name,
                    value: n.value,
                    group: n.group,
                    description: n.description,
                    createdat: new Date(),
                    createdby: 1,
                },
            })
        )
    );
    
    await pc.services.create({
        data: {
            name: 'Kullanıcı Yönetimi',
            description: 'Kullanıcı Yönetimi Servisi',
            duration: 30,
            price: 100,
            thumbnail: "https://media.istockphoto.com/id/1283504873/photo/mosque-and-bosphorus-bridge.jpg?s=612x612&w=0&k=20&c=UHyYLC4VVJef9V8vzdJsVwqSjX3N06D2-975j3VoajY=",
            createdat: new Date(),
            createdby: 1,
            status: 1,
        },
    });
}

main()
    .then(async () => {
        await pc.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await pc.$disconnect();
        process.exit(1);
    });