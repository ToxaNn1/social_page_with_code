const defaultStore = {
    infoPerson: [],
    info: [
        {
            id: 0,
            name: "Anton Demydenko",
            username: "fsdf",
            email: "Sin22cere@april.biz",
            address: {
                street: "Kul2as Lig2ht",
                city: "Gwenborough",
            },
            phone: "1-770-736-8031 x56442",
        },
    ],
    posts: { id: 1, title: "Hello World", body: "Welcome to learning React!" },
    images: [
        {
            id: 1,
            url: "../image/ava.jpg",
            title: "first photo",
        },
        {
            id: 2,
            url: "../image/mount.jpg",
            title: "first photo",
        },
        {
            id: 3,
            url: "../image/mount.jpg",
            title: "first photo",
        },
        {
            id: 4,
            url: "../image/mount.jpg",
            title: "first photo",
        },
    ],
};

const START_POST = "START_POST";
const ADD_POST = "ADD_POST";

const START = "START";
const DELETE = "DELETE";
const SEARCH = "SEARCH";

const START_ONE_PERSON = "START_ONE_PERSON";

const START_IMAGE = "START_IMAGE";
const START_FRIENDS = "START_FRIENDS";

let deleteArray = [];

export const reducerMain = (state = defaultStore, action) => {
    const arrAfterDelete = (userList = action.payload) => {
        let result = userList.filter((item, index) => {
            return !deleteArray.find((toDelete) => toDelete.id === item.id);
        });
        return result;
    };

    switch (action.type) {
        case START_IMAGE:
            let newImages = action.payload.filter((item) => item.albumId < 2 && item.id < 5)
            return { ...state, images: [...state.images, ...newImages] };

        case START_FRIENDS:
            let newArrFriends = action.payload.filter((item) => item.albumId < 2 && item.id < 5);
            return { ...state, images: [...state.images,...newArrFriends] };

        case START_POST:
            return { ...state, posts: [action.payload] };

        case START_ONE_PERSON:
            return { ...state, infoPerson: action.payload };

        case START:
            return {
                ...state,
                info: deleteArray === false ? [...action.payload] : arrAfterDelete(),
            };

        case DELETE:
            deleteArray.push(...state.info.filter((elem) => elem.id === action.payload));
            return { ...state, info: state.info.filter((elem) => elem.id !== action.payload) };

        case SEARCH:
            let newArr = state.info.filter((elem) => elem.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                info: newArr,
            };
        case ADD_POST:
            if (action.payload.valueInput && action.payload.valueTextArea) {
                let newDict = {
                    id: action.payload.post.length + 22,
                    title: action.payload.valueInput,
                    body: action.payload.valueTextArea,
                };
                let newPosts = state.posts;
                newPosts[0].unshift(newDict);
                return {
                    ...state,
                    posts: [...newPosts],
                };
            } else {
                return {
                    ...state,
                };
            }

        default:
            return state;
    }
};

// images
export const startCreaterImage = (payload) => ({ type: START_IMAGE, payload });
export const startCreaterFriends = (payload) => ({ type: START_FRIENDS, payload });

// friends
export const startCreater = (payload) => ({ type: START, payload });
export const searchCreater = (payload) => ({ type: SEARCH, payload });
export const deleteCreater = (payload) => ({ type: DELETE, payload });

// post
export const actionStartPost = (payload) => ({ type: START_POST, payload });
export const createrAddPost = (payload) => ({ type: ADD_POST, payload });

//friends descrip
export const onePersonCreater = (payload) => ({ type: START_ONE_PERSON, payload });
