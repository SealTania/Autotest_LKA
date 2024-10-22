/**
 * преобразование номера в шаблон +7 (ххх) ххх-хх-хх
 * 
 * @param phone исходный номер телефона
 * @returns отформатированный номер телефона
 */
export const phoneFormatted = (phone:string) : string => {
    const phoneFormatted = phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 ($1) $2-$3-$4");
    console.log(`Преобразованный номер по маске ${phoneFormatted}`);
    return phoneFormatted;
}

// запрос авторизации в рокете
export const rocketAuth = async (request) => {
    const response = await request.post('https://chat.artsofte.ru/api/v1/method.callAnon/login', 
        {
            data:{
                "message": "{\"msg\":\"method\",\"id\":\"5\",\"method\":\"login\",\"params\":[{\"ldap\":true,\"username\":\"treznikova\",\"ldapPass\":\"wsCNzES843}4\",\"ldapOptions\":{}}]}"
            }
        }
    );
    const json = await response.json();
    const message = JSON.parse(json.message);
    const result = message.result;
    console.log(`Token ${result.token}`);
    console.log(`User id ${result.id}`);
    return result;
};

// запрос вытаскивания кода авторизации
export const getCodeFromRocket = async (phone:string, request, authResult) => {
    const response = await request.get(
        'https://chat.artsofte.ru/api/v1/chat.search',
        {
            params: {
                roomId: 'hGTeSq6nEW9c22trw',
                searchText: `7${phone}`,
                count: 1
            },
            headers: {
                'X-Auth-Token': authResult.token,
                'X-User-Id': authResult.id
            }}
    );
    const json = await response.json();
    const message = json.messages[0].msg;
    console.log(message);
    console.log(message.substring(107,114));
    return message.substring(107,114);   // для стейджа 100, 108; а для прода 107, 114
    
};

// запрос вытаскивания кода регистрации
export const getCodeFromRocketReg = async (phone:string, request, authResult) => {
    const response = await request.get(
        'https://chat.artsofte.ru/api/v1/chat.search',
        {
            params: {
                roomId: 'hGTeSq6nEW9c22trw',
                searchText: `7${phone}`,
                count: 1
            },
            headers: {
                'X-Auth-Token': authResult.token,
                'X-User-Id': authResult.id
            }}
    );
    const json = await response.json();
    const message = json.messages[0].msg;
    console.log(message);
    console.log(message.substring(94,98));
    return message.substring(94,98);   // для стейджа ...... а для прода 94, 98
    
};




/* Авторизация в ЛК 
export const bearerTokenLK = async (request) : Promise<string> => {
    const response = await request.post('https://lk-pb6114-t1.liteproject.ru/sso/connect/token', 
        {
            headers: {
                'x-tenantid': 'pb6114',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                'refresh_token': '52E7111B99AB6BF77B96C49D67D4544D9D991D865E45903D69DB62A15A07C303',
                'client_id': 'artsofte',
                'client_secret': 'artsofteSecret',
                'scope': 'offline_access ApiResource_LK legal_info openid IdentityServerApi',
                'grant_type': 'refresh_token'
              }
        }
    );
    
    const json = await response.json();
    const refreshToken =  json.refresh_token;
    const Bearer = json.access_token;
    return Bearer;
}
// вытаскивание рандомного ЖК из списка в ЛКА
export const randomeProjects = async (request) : Promise<{ name: string; }>=> {
    const response = await request.get('https://lk-pb6114-t1.liteproject.ru/lk-api/api/profit/agent/proxy/auth/api/v1/account/dictionary/projects', 
        {
            headers: {
                'x-tenantid': 'pb6114',
                'authorization': `Bearer ${bearerTokenLK(request)}`,
            }
        }
    );
    const projects = response.json();
    const  max = projects.length;    // max длина массива
    const randomeProjects = projects[Math.floor(Math.random() * (max))];     //вытаскивает рандомное элемента массива: (Math.random() * (max)) и округляет его
    return randomeProjects;
};
*/

// вытаскивание рандомного помещения из ЖК из фиксации