/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-02-16 22:07:24.

export interface Notification {
    id: number;
    title: string;
    message: string;
    url: string;
    delivered: boolean;
    createdAt: Date;
}

export interface NotificationPermissionRequest {
    id?: number;
    requestedBy: RequestEvent;
    deniedReason: DeniedReason;
    createdAt?: Date;
}

export interface PushNotificationSubscription {
    id: number;
    endpoint: string;
    p256dhKey: string;
    authKey: string;
    createdAt: Date;
}

export interface SendNotificationRequest {
    title: string;
    message: string;
    url: string;
}

export interface SubscriptionRequest {
    endpoint: string;
    p256dh: string;
    auth: string;
}

export interface NotificationSubscribersByDate {
    date: string;
    subscribers: number;
}

export interface NotificationsByDate {
    date: string;
    sent: number;
    delivered: number;
}

export interface UploadedFile extends AbstractEntity {
    url: string;
    size: number;
    originalFileName: string;
    extension: string;
    createdAt: Date;
    uploadedAt: Date;
}

export interface Authors extends Serializable {
    id: number;
    name: string;
    gender: boolean;
    birthYear: number;
    deathYear: number;
}

export interface Books extends Serializable {
    id: number;
    title: string;
    type: string;
    publishedAt: Date;
    stock: number;
    price: number;
}

export interface Orders extends Serializable {
    id: number;
    bookId: number;
    userId: number;
    quality: number;
    orderedAt: Date;
    books: Books;
    user: User;
}

export interface Ratings extends Serializable {
    bookId: number;
    userId: number;
    score: number;
    ratedAt: Date;
    books: Books;
    user: User;
}

export interface PasswordResetToken extends AbstractEntity {
    token: string;
    emailSent: boolean;
    expiresAt: Date;
    user: User;
    expired: boolean;
}

export interface User extends AbstractEntity, UserDetails {
    email: string;
    firstName: string;
    lastName: string;
    balance: number;
    verified: boolean;
    profileImageUrl: string;
    role: Role;
    verificationCode: VerificationCode;
    connectedAccounts: UserConnectedAccount[];
}

export interface UserConnectedAccount extends AbstractEntity {
    provider: string;
    providerId: string;
    connectedAt: Date;
    user: User;
}

export interface VerificationCode extends AbstractEntity {
    code: string;
    emailSent: boolean;
    user: User;
}

export interface CreateUserRequest {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstName?: string;
    lastName?: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface UpdateUserPasswordRequest {
    oldPassword: string;
    password: string;
    confirmPassword: string;
    passwordResetToken: string;
}

export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
}

export interface UserResponse {
    id: number;
    role: Role;
    firstName?: string;
    lastName?: string;
    email: string;
    profileImageUrl?: string;
    connectedAccounts: ConnectedAccountResponse[];
    authorities: string[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AbstractEntity {
    id: number;
}

export interface Serializable {
}

export interface AuthorsDTO extends Serializable {
    id: number;
    name: string;
    gender: boolean;
    birthYear: number;
    deathYear: number;
}

export interface BooksDTO extends Serializable {
    id: number;
    title: string;
    type: string;
    publishedAt: Date;
    stock: number;
    price: number;
}

export interface OrdersDTO extends Serializable {
    id: number;
    bookId: number;
    userId: number;
    quality: number;
    orderedAt: Date;
    books: BooksDTO;
    user: UserDTO;
}

export interface OrdersResponseDTO extends Serializable {
    orderDTO: OrdersDTO;
    cost: number;
    remain: number;
}

export interface RatingsDTO extends Serializable {
    bookId: number;
    userId: number;
    score: number;
    ratedAt: Date;
    books?: BooksDTO | null;
    user?: UserDTO | null;
    userDTO?: UserDTO | null;
}

export interface UserDTO extends Serializable {
    id: number;
    balance: number;
    firstName: string;
    lastName: string;
}

export interface GrantedAuthority extends Serializable {
    authority: string;
}

export interface UserDetails extends Serializable {
    enabled: boolean;
    password: string;
    username: string;
    authorities: GrantedAuthority[];
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
}

export interface MultipartFile extends InputStreamSource {
    name: string;
    bytes: number[];
    empty: boolean;
    resource: Resource;
    size: number;
    originalFilename: string;
    contentType: string;
}

export interface RedirectView extends AbstractUrlBasedView, SmartView {
    hosts: string[];
    propagateQueryProperties: boolean;
    servletContext: ServletContext;
    exposeContextBeansAsAttributes: boolean;
    exposedContextBeanNames: string[];
    contextRelative: boolean;
    http10Compatible: boolean;
    exposeModelAttributes: boolean;
    encodingScheme: string;
    statusCode: HttpStatus;
    expandUriTemplateVariables: boolean;
    propagateQueryParams: boolean;
    attributes: { [index: string]: any };
    attributesCSV: string;
}

export interface ConnectedAccountResponse {
    provider: string;
    connectedAt: Date;
}

export interface PagedResponse<T> {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    data: T[];
}

export interface BooksResponseDTO {
    id: number;
    title: string;
    type: string;
    publishedAt: Date;
    stock: number;
    price: number;
    authors: string[];
    averageRating: number;
}

export interface Resource extends InputStreamSource {
    open: boolean;
    file: File;
    readable: boolean;
    url: URL;
    description: string;
    uri: URI;
    filename: string;
}

export interface InputStream extends Closeable {
}

export interface InputStreamSource {
    inputStream: InputStream;
}

export interface ApplicationContext extends EnvironmentCapable, ListableBeanFactory, HierarchicalBeanFactory, MessageSource, ApplicationEventPublisher, ResourcePatternResolver {
    parent: ApplicationContext;
    id: string;
    displayName: string;
    applicationName: string;
    autowireCapableBeanFactory: AutowireCapableBeanFactory;
    startupDate: number;
}

export interface ServletContext {
    classLoader: ClassLoader;
    majorVersion: number;
    minorVersion: number;
    attributeNames: Enumeration<string>;
    contextPath: string;
    defaultSessionTrackingModes: SessionTrackingMode[];
    effectiveSessionTrackingModes: SessionTrackingMode[];
    effectiveMajorVersion: number;
    effectiveMinorVersion: number;
    /**
     * @deprecated
     */
    servlets: Enumeration<Servlet>;
    /**
     * @deprecated
     */
    servletNames: Enumeration<string>;
    serverInfo: string;
    initParameterNames: Enumeration<string>;
    servletContextName: string;
    servletRegistrations: { [index: string]: ServletRegistration };
    filterRegistrations: { [index: string]: FilterRegistration };
    sessionCookieConfig: SessionCookieConfig;
    jspConfigDescriptor: JspConfigDescriptor;
    virtualServerName: string;
    sessionTimeout: number;
    requestCharacterEncoding: string;
    responseCharacterEncoding: string;
}

export interface AbstractUrlBasedView extends AbstractView, InitializingBean {
    url: string;
}

export interface SmartView extends View {
    redirectView: boolean;
}

export interface File extends Serializable, Comparable<File> {
}

export interface URL extends Serializable {
}

export interface URI extends Comparable<URI>, Serializable {
}

export interface Closeable extends AutoCloseable {
}

export interface AutowireCapableBeanFactory extends BeanFactory {
}

export interface Environment extends PropertyResolver {
    activeProfiles: string[];
    defaultProfiles: string[];
}

export interface BeanFactory {
}

export interface ClassLoader {
}

export interface EnvironmentCapable {
    environment: Environment;
}

export interface ListableBeanFactory extends BeanFactory {
    beanDefinitionCount: number;
    beanDefinitionNames: string[];
}

export interface HierarchicalBeanFactory extends BeanFactory {
    parentBeanFactory: BeanFactory;
}

export interface MessageSource {
}

export interface ApplicationEventPublisher {
}

export interface ResourcePatternResolver extends ResourceLoader {
}

export interface Enumeration<E> {
}

export interface Servlet {
    servletConfig: ServletConfig;
    servletInfo: string;
}

export interface ServletRegistration extends Registration {
    mappings: string[];
    runAsRole: string;
}

export interface FilterRegistration extends Registration {
    servletNameMappings: string[];
    urlPatternMappings: string[];
}

export interface SessionCookieConfig {
    name: string;
    path: string;
    comment: string;
    domain: string;
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
}

export interface JspConfigDescriptor {
    taglibs: TaglibDescriptor[];
    jspPropertyGroups: JspPropertyGroupDescriptor[];
}

export interface AbstractView extends WebApplicationObjectSupport, View, BeanNameAware {
    requestContextAttribute: string;
    staticAttributes: { [index: string]: any };
    exposePathVariables: boolean;
    beanName: string;
    attributesMap: { [index: string]: any };
}

export interface InitializingBean {
}

export interface View {
    contentType: string;
}

export interface AutoCloseable {
}

export interface PropertyResolver {
}

export interface ResourceLoader {
    classLoader: ClassLoader;
}

export interface ServletConfig {
    servletContext: ServletContext;
    initParameterNames: Enumeration<string>;
    servletName: string;
}

export interface Registration {
    name: string;
    className: string;
    initParameters: { [index: string]: string };
}

export interface TaglibDescriptor {
    taglibURI: string;
    taglibLocation: string;
}

export interface JspPropertyGroupDescriptor {
    buffer: string;
    deferredSyntaxAllowedAsLiteral: string;
    urlPatterns: string[];
    elIgnored: string;
    pageEncoding: string;
    scriptingInvalid: string;
    isXml: string;
    includePreludes: string[];
    includeCodas: string[];
    trimDirectiveWhitespaces: string;
    defaultContentType: string;
    errorOnUndeclaredNamespace: string;
}

export interface WebApplicationObjectSupport extends ApplicationObjectSupport, ServletContextAware {
}

export interface BeanNameAware extends Aware {
}

export interface Comparable<T> {
}

export interface ApplicationObjectSupport extends ApplicationContextAware {
    applicationContext: ApplicationContext;
}

export interface ServletContextAware extends Aware {
}

export interface Aware {
}

export interface ApplicationContextAware extends Aware {
}

export interface HttpClient {

    request<R>(requestConfig: { method: string; url: string; queryParams?: any; data?: any; copyFn?: (data: R) => R; }): RestResponse<R>;
}

export class RestApplicationClient {

    constructor(protected httpClient: HttpClient) {
    }

    /**
     * HTTP GET /api/admin/users
     * Java method: com.example.backend.admin.controller.AdminUserController.admin_getUser
     */
    admin_getUser(queryParams?: { page?: number; }): RestResponse<PagedResponse<UserResponse>> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/admin/users`, queryParams: queryParams });
    }

    /**
     * HTTP GET /api/auth/csrf
     * Java method: com.example.backend.auth.controller.AuthController.csrf
     */
    csrf(): RestResponse<any> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/auth/csrf` });
    }

    /**
     * HTTP POST /api/auth/login
     * Java method: com.example.backend.auth.controller.AuthController.login
     */
    login(body: LoginRequest): RestResponse<any> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/login`, data: body });
    }

    /**
     * HTTP POST /api/auth/logout
     * Java method: com.example.backend.auth.controller.AuthController.logout
     */
    logout(): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/auth/logout` });
    }

    /**
     * HTTP GET /api/auth/me
     * Java method: com.example.backend.auth.controller.AuthController.getSession
     */
    getSession(): RestResponse<UserResponse> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/auth/me` });
    }

    /**
     * HTTP POST /api/notifications/delivery/{id}
     * Java method: com.example.backend.pushNotifications.NotificationsController.pushNotificationDelivery
     */
    pushNotificationDelivery(id: number): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/notifications/delivery/${id}` });
    }

    /**
     * HTTP POST /api/notifications/denied
     * Java method: com.example.backend.pushNotifications.NotificationsController.pushNotificationRequestDenied
     */
    pushNotificationRequestDenied(request: NotificationPermissionRequest): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/notifications/denied`, data: request });
    }

    /**
     * HTTP POST /api/notifications/notify
     * Java method: com.example.backend.pushNotifications.NotificationsController.pushNotificationNotify
     */
    pushNotificationNotify(request: SendNotificationRequest): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/notifications/notify`, data: request });
    }

    /**
     * HTTP GET /api/notifications/stats/delivery
     * Java method: com.example.backend.pushNotifications.NotificationsController.getNotificationDeliveryStats
     */
    getNotificationDeliveryStats(queryParams?: { from?: Date; to?: Date; }): RestResponse<NotificationsByDate[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/notifications/stats/delivery`, queryParams: queryParams });
    }

    /**
     * HTTP GET /api/notifications/stats/subscriptions
     * Java method: com.example.backend.pushNotifications.NotificationsController.getNotificationSubscriptionStats
     */
    getNotificationSubscriptionStats(queryParams?: { from?: Date; to?: Date; }): RestResponse<NotificationSubscribersByDate[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/notifications/stats/subscriptions`, queryParams: queryParams });
    }

    /**
     * HTTP POST /api/notifications/subscribe
     * Java method: com.example.backend.pushNotifications.NotificationsController.pushNotificationSubscribe
     */
    pushNotificationSubscribe(request: SubscriptionRequest): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/notifications/subscribe`, data: request });
    }

    /**
     * HTTP POST /api/users
     * Java method: com.example.backend.users.controller.UserController.createUser
     */
    createUser(request: CreateUserRequest): RestResponse<UserResponse> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/users`, data: request });
    }

    /**
     * HTTP POST /api/users/forgot-password
     * Java method: com.example.backend.users.controller.UserController.forgotPassword
     */
    forgotPassword(req: ForgotPasswordRequest): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/users/forgot-password`, data: req });
    }

    /**
     * HTTP PATCH /api/users/password
     * Java method: com.example.backend.users.controller.UserController.updatePassword
     */
    updatePassword(requestDTO: UpdateUserPasswordRequest): RestResponse<UserResponse> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/users/password`, data: requestDTO });
    }

    /**
     * HTTP PATCH /api/users/reset-password
     * Java method: com.example.backend.users.controller.UserController.resetPassword
     */
    resetPassword(requestDTO: UpdateUserPasswordRequest): RestResponse<void> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/users/reset-password`, data: requestDTO });
    }

    /**
     * HTTP GET /api/users/verify-email
     * Java method: com.example.backend.users.controller.UserController.verifyEmail
     */
    verifyEmail(queryParams: { token: string; }): RestResponse<RedirectView> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/users/verify-email`, queryParams: queryParams });
    }

    /**
     * HTTP PUT /api/users/{id}
     * Java method: com.example.backend.users.controller.UserController.updateUser
     */
    updateUser(id: string, request: UpdateUserRequest): RestResponse<UserResponse> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/users/${id}`, data: request });
    }

    /**
     * HTTP PATCH /api/users/{id}/profile-picture
     * Java method: com.example.backend.users.controller.UserController.updateProfilePicture
     */
    updateProfilePicture(id: number, queryParams: { file: MultipartFile; }): RestResponse<UserResponse> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/users/${id}/profile-picture`, queryParams: queryParams });
    }

    /**
     * HTTP POST /api/v1/authors
     * Java method: com.example.backend.telosys.rest.controllers.AuthorsRestController.create
     */
    create$POST$api_v1_authors(authorsDTO: AuthorsDTO): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/v1/authors`, data: authorsDTO });
    }

    /**
     * HTTP GET /api/v1/authors
     * Java method: com.example.backend.telosys.rest.controllers.AuthorsRestController.findAll
     */
    findAll$GET$api_v1_authors(): RestResponse<AuthorsDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/authors` });
    }

    /**
     * HTTP PUT /api/v1/authors
     * Java method: com.example.backend.telosys.rest.controllers.AuthorsRestController.update
     */
    update$PUT$api_v1_authors(authorsDTO: AuthorsDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/authors`, data: authorsDTO });
    }

    /**
     * HTTP DELETE /api/v1/authors/{id}
     * Java method: com.example.backend.telosys.rest.controllers.AuthorsRestController.deleteById
     */
    deleteById$DELETE$api_v1_authors_id(id: number): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/v1/authors/${id}` });
    }

    /**
     * HTTP GET /api/v1/authors/{id}
     * Java method: com.example.backend.telosys.rest.controllers.AuthorsRestController.findById
     */
    findById$GET$api_v1_authors_id(id: number): RestResponse<AuthorsDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/authors/${id}` });
    }

    /**
     * HTTP PATCH /api/v1/authors/{id}
     * Java method: com.example.backend.telosys.rest.controllers.AuthorsRestController.partialUpdate
     */
    partialUpdate$PATCH$api_v1_authors_id(id: number, authorsDTO: AuthorsDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/v1/authors/${id}`, data: authorsDTO });
    }

    /**
     * HTTP PUT /api/v1/authors/{id}
     * Java method: com.example.backend.telosys.rest.controllers.AuthorsRestController.save
     */
    save$PUT$api_v1_authors_id(id: number, authorsDTO: AuthorsDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/authors/${id}`, data: authorsDTO });
    }

    /**
     * HTTP POST /api/v1/books
     * Java method: com.example.backend.telosys.rest.controllers.BooksRestController.create
     */
    create$POST$api_v1_books(booksDTO: BooksDTO): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/v1/books`, data: booksDTO });
    }

    /**
     * HTTP GET /api/v1/books
     * Java method: com.example.backend.telosys.rest.controllers.BooksRestController.findAllWithPagination
     */
    findAllWithPagination(queryParams?: { page?: number; size?: number; type?: string; sort?: string; }): RestResponse<BooksResponseDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/books`, queryParams: queryParams });
    }

    /**
     * HTTP PUT /api/v1/books
     * Java method: com.example.backend.telosys.rest.controllers.BooksRestController.update
     */
    update$PUT$api_v1_books(booksDTO: BooksDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/books`, data: booksDTO });
    }

    /**
     * HTTP GET /api/v1/books/totalBooksWithAuthorsAndAvgScore
     * Java method: com.example.backend.telosys.rest.controllers.BooksRestController.getTotalBooksWithAuthorsAndAvgScore
     */
    getTotalBooksWithAuthorsAndAvgScore(queryParams?: { type?: string; }): RestResponse<number> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/books/totalBooksWithAuthorsAndAvgScore`, queryParams: queryParams });
    }

    /**
     * HTTP DELETE /api/v1/books/{id}
     * Java method: com.example.backend.telosys.rest.controllers.BooksRestController.deleteById
     */
    deleteById$DELETE$api_v1_books_id(id: number): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/v1/books/${id}` });
    }

    /**
     * HTTP GET /api/v1/books/{id}
     * Java method: com.example.backend.telosys.rest.controllers.BooksRestController.findById
     */
    findById$GET$api_v1_books_id(id: number): RestResponse<BooksDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/books/${id}` });
    }

    /**
     * HTTP PATCH /api/v1/books/{id}
     * Java method: com.example.backend.telosys.rest.controllers.BooksRestController.partialUpdate
     */
    partialUpdate$PATCH$api_v1_books_id(id: number, booksDTO: BooksDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/v1/books/${id}`, data: booksDTO });
    }

    /**
     * HTTP PUT /api/v1/books/{id}
     * Java method: com.example.backend.telosys.rest.controllers.BooksRestController.save
     */
    save$PUT$api_v1_books_id(id: number, booksDTO: BooksDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/books/${id}`, data: booksDTO });
    }

    /**
     * HTTP POST /api/v1/orders
     * Java method: com.example.backend.telosys.rest.controllers.OrdersRestController.create
     */
    create$POST$api_v1_orders(ordersDTO: OrdersDTO): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/v1/orders`, data: ordersDTO });
    }

    /**
     * HTTP GET /api/v1/orders
     * Java method: com.example.backend.telosys.rest.controllers.OrdersRestController.findAll
     */
    findAll$GET$api_v1_orders(): RestResponse<OrdersDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/orders` });
    }

    /**
     * HTTP PUT /api/v1/orders
     * Java method: com.example.backend.telosys.rest.controllers.OrdersRestController.update
     */
    update$PUT$api_v1_orders(ordersDTO: OrdersDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/orders`, data: ordersDTO });
    }

    /**
     * HTTP POST /api/v1/orders/buybook
     * Java method: com.example.backend.telosys.rest.controllers.OrdersRestController.buyBook
     */
    buyBook(ordersDTO: OrdersDTO): RestResponse<OrdersResponseDTO> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/v1/orders/buybook`, data: ordersDTO });
    }

    /**
     * HTTP DELETE /api/v1/orders/{id}
     * Java method: com.example.backend.telosys.rest.controllers.OrdersRestController.deleteById
     */
    deleteById$DELETE$api_v1_orders_id(id: number): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/v1/orders/${id}` });
    }

    /**
     * HTTP GET /api/v1/orders/{id}
     * Java method: com.example.backend.telosys.rest.controllers.OrdersRestController.findById
     */
    findById$GET$api_v1_orders_id(id: number): RestResponse<OrdersDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/orders/${id}` });
    }

    /**
     * HTTP PATCH /api/v1/orders/{id}
     * Java method: com.example.backend.telosys.rest.controllers.OrdersRestController.partialUpdate
     */
    partialUpdate$PATCH$api_v1_orders_id(id: number, ordersDTO: OrdersDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/v1/orders/${id}`, data: ordersDTO });
    }

    /**
     * HTTP PUT /api/v1/orders/{id}
     * Java method: com.example.backend.telosys.rest.controllers.OrdersRestController.save
     */
    save$PUT$api_v1_orders_id(id: number, ordersDTO: OrdersDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/orders/${id}`, data: ordersDTO });
    }

    /**
     * HTTP POST /api/v1/ratings
     * Java method: com.example.backend.telosys.rest.controllers.RatingsRestController.create
     */
    create$POST$api_v1_ratings(ratingsDTO: RatingsDTO): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/v1/ratings`, data: ratingsDTO });
    }

    /**
     * HTTP GET /api/v1/ratings
     * Java method: com.example.backend.telosys.rest.controllers.RatingsRestController.findAll
     */
    findAll$GET$api_v1_ratings(): RestResponse<RatingsDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/ratings` });
    }

    /**
     * HTTP PUT /api/v1/ratings
     * Java method: com.example.backend.telosys.rest.controllers.RatingsRestController.update
     */
    update$PUT$api_v1_ratings(ratingsDTO: RatingsDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/ratings`, data: ratingsDTO });
    }

    /**
     * HTTP GET /api/v1/ratings/{bookId}
     * Java method: com.example.backend.telosys.rest.controllers.RatingsRestController.findByBookId
     */
    findByBookId(bookId: number): RestResponse<RatingsDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/ratings/${bookId}` });
    }

    /**
     * HTTP DELETE /api/v1/ratings/{bookId}/{userId}
     * Java method: com.example.backend.telosys.rest.controllers.RatingsRestController.deleteById
     */
    deleteById$DELETE$api_v1_ratings_bookId_userId(bookId: number, userId: number): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/v1/ratings/${bookId}/${userId}` });
    }

    /**
     * HTTP GET /api/v1/ratings/{bookId}/{userId}
     * Java method: com.example.backend.telosys.rest.controllers.RatingsRestController.findById
     */
    findById$GET$api_v1_ratings_bookId_userId(bookId: number, userId: number): RestResponse<RatingsDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/ratings/${bookId}/${userId}` });
    }

    /**
     * HTTP PATCH /api/v1/ratings/{bookId}/{userId}
     * Java method: com.example.backend.telosys.rest.controllers.RatingsRestController.partialUpdate
     */
    partialUpdate$PATCH$api_v1_ratings_bookId_userId(bookId: number, userId: number, ratingsDTO: RatingsDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/v1/ratings/${bookId}/${userId}`, data: ratingsDTO });
    }

    /**
     * HTTP PUT /api/v1/ratings/{bookId}/{userId}
     * Java method: com.example.backend.telosys.rest.controllers.RatingsRestController.save
     */
    save$PUT$api_v1_ratings_bookId_userId(bookId: number, userId: number, ratingsDTO: RatingsDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/ratings/${bookId}/${userId}`, data: ratingsDTO });
    }

    /**
     * HTTP POST /api/v1/user
     * Java method: com.example.backend.telosys.rest.controllers.UserRestController.create
     */
    create$POST$api_v1_user(userDTO: UserDTO): RestResponse<void> {
        return this.httpClient.request({ method: "POST", url: uriEncoding`api/v1/user`, data: userDTO });
    }

    /**
     * HTTP GET /api/v1/user
     * Java method: com.example.backend.telosys.rest.controllers.UserRestController.findAll
     */
    findAll$GET$api_v1_user(): RestResponse<UserDTO[]> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/user` });
    }

    /**
     * HTTP PUT /api/v1/user
     * Java method: com.example.backend.telosys.rest.controllers.UserRestController.update
     */
    update$PUT$api_v1_user(userDTO: UserDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/user`, data: userDTO });
    }

    /**
     * HTTP DELETE /api/v1/user/{id}
     * Java method: com.example.backend.telosys.rest.controllers.UserRestController.deleteById
     */
    deleteById$DELETE$api_v1_user_id(id: number): RestResponse<void> {
        return this.httpClient.request({ method: "DELETE", url: uriEncoding`api/v1/user/${id}` });
    }

    /**
     * HTTP GET /api/v1/user/{id}
     * Java method: com.example.backend.telosys.rest.controllers.UserRestController.findById
     */
    findById$GET$api_v1_user_id(id: number): RestResponse<UserDTO> {
        return this.httpClient.request({ method: "GET", url: uriEncoding`api/v1/user/${id}` });
    }

    /**
     * HTTP PATCH /api/v1/user/{id}
     * Java method: com.example.backend.telosys.rest.controllers.UserRestController.partialUpdate
     */
    partialUpdate$PATCH$api_v1_user_id(id: number, userDTO: UserDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PATCH", url: uriEncoding`api/v1/user/${id}`, data: userDTO });
    }

    /**
     * HTTP PUT /api/v1/user/{id}
     * Java method: com.example.backend.telosys.rest.controllers.UserRestController.save
     */
    save$PUT$api_v1_user_id(id: number, userDTO: UserDTO): RestResponse<void> {
        return this.httpClient.request({ method: "PUT", url: uriEncoding`api/v1/user/${id}`, data: userDTO });
    }
}

export type RestResponse<R> = Promise<R>;

export type RequestEvent = "ONLOAD" | "USER_INTERACTION";

export type DeniedReason = "NOT_SUPPORTED" | "NOT_GRANTED";

export type Role = "USER" | "ADMIN";

/**
 * Values:
 * - `CONTINUE`
 * - `SWITCHING_PROTOCOLS`
 * - `PROCESSING`
 * - `CHECKPOINT`
 * - `OK`
 * - `CREATED`
 * - `ACCEPTED`
 * - `NON_AUTHORITATIVE_INFORMATION`
 * - `NO_CONTENT`
 * - `RESET_CONTENT`
 * - `PARTIAL_CONTENT`
 * - `MULTI_STATUS`
 * - `ALREADY_REPORTED`
 * - `IM_USED`
 * - `MULTIPLE_CHOICES`
 * - `MOVED_PERMANENTLY`
 * - `FOUND`
 * - `MOVED_TEMPORARILY` - @deprecated
 * - `SEE_OTHER`
 * - `NOT_MODIFIED`
 * - `USE_PROXY` - @deprecated
 * - `TEMPORARY_REDIRECT`
 * - `PERMANENT_REDIRECT`
 * - `BAD_REQUEST`
 * - `UNAUTHORIZED`
 * - `PAYMENT_REQUIRED`
 * - `FORBIDDEN`
 * - `NOT_FOUND`
 * - `METHOD_NOT_ALLOWED`
 * - `NOT_ACCEPTABLE`
 * - `PROXY_AUTHENTICATION_REQUIRED`
 * - `REQUEST_TIMEOUT`
 * - `CONFLICT`
 * - `GONE`
 * - `LENGTH_REQUIRED`
 * - `PRECONDITION_FAILED`
 * - `PAYLOAD_TOO_LARGE`
 * - `REQUEST_ENTITY_TOO_LARGE` - @deprecated
 * - `URI_TOO_LONG`
 * - `REQUEST_URI_TOO_LONG` - @deprecated
 * - `UNSUPPORTED_MEDIA_TYPE`
 * - `REQUESTED_RANGE_NOT_SATISFIABLE`
 * - `EXPECTATION_FAILED`
 * - `I_AM_A_TEAPOT`
 * - `INSUFFICIENT_SPACE_ON_RESOURCE` - @deprecated
 * - `METHOD_FAILURE` - @deprecated
 * - `DESTINATION_LOCKED` - @deprecated
 * - `UNPROCESSABLE_ENTITY`
 * - `LOCKED`
 * - `FAILED_DEPENDENCY`
 * - `TOO_EARLY`
 * - `UPGRADE_REQUIRED`
 * - `PRECONDITION_REQUIRED`
 * - `TOO_MANY_REQUESTS`
 * - `REQUEST_HEADER_FIELDS_TOO_LARGE`
 * - `UNAVAILABLE_FOR_LEGAL_REASONS`
 * - `INTERNAL_SERVER_ERROR`
 * - `NOT_IMPLEMENTED`
 * - `BAD_GATEWAY`
 * - `SERVICE_UNAVAILABLE`
 * - `GATEWAY_TIMEOUT`
 * - `HTTP_VERSION_NOT_SUPPORTED`
 * - `VARIANT_ALSO_NEGOTIATES`
 * - `INSUFFICIENT_STORAGE`
 * - `LOOP_DETECTED`
 * - `BANDWIDTH_LIMIT_EXCEEDED`
 * - `NOT_EXTENDED`
 * - `NETWORK_AUTHENTICATION_REQUIRED`
 */
export type HttpStatus = "CONTINUE" | "SWITCHING_PROTOCOLS" | "PROCESSING" | "CHECKPOINT" | "OK" | "CREATED" | "ACCEPTED" | "NON_AUTHORITATIVE_INFORMATION" | "NO_CONTENT" | "RESET_CONTENT" | "PARTIAL_CONTENT" | "MULTI_STATUS" | "ALREADY_REPORTED" | "IM_USED" | "MULTIPLE_CHOICES" | "MOVED_PERMANENTLY" | "FOUND" | "MOVED_TEMPORARILY" | "SEE_OTHER" | "NOT_MODIFIED" | "USE_PROXY" | "TEMPORARY_REDIRECT" | "PERMANENT_REDIRECT" | "BAD_REQUEST" | "UNAUTHORIZED" | "PAYMENT_REQUIRED" | "FORBIDDEN" | "NOT_FOUND" | "METHOD_NOT_ALLOWED" | "NOT_ACCEPTABLE" | "PROXY_AUTHENTICATION_REQUIRED" | "REQUEST_TIMEOUT" | "CONFLICT" | "GONE" | "LENGTH_REQUIRED" | "PRECONDITION_FAILED" | "PAYLOAD_TOO_LARGE" | "REQUEST_ENTITY_TOO_LARGE" | "URI_TOO_LONG" | "REQUEST_URI_TOO_LONG" | "UNSUPPORTED_MEDIA_TYPE" | "REQUESTED_RANGE_NOT_SATISFIABLE" | "EXPECTATION_FAILED" | "I_AM_A_TEAPOT" | "INSUFFICIENT_SPACE_ON_RESOURCE" | "METHOD_FAILURE" | "DESTINATION_LOCKED" | "UNPROCESSABLE_ENTITY" | "LOCKED" | "FAILED_DEPENDENCY" | "TOO_EARLY" | "UPGRADE_REQUIRED" | "PRECONDITION_REQUIRED" | "TOO_MANY_REQUESTS" | "REQUEST_HEADER_FIELDS_TOO_LARGE" | "UNAVAILABLE_FOR_LEGAL_REASONS" | "INTERNAL_SERVER_ERROR" | "NOT_IMPLEMENTED" | "BAD_GATEWAY" | "SERVICE_UNAVAILABLE" | "GATEWAY_TIMEOUT" | "HTTP_VERSION_NOT_SUPPORTED" | "VARIANT_ALSO_NEGOTIATES" | "INSUFFICIENT_STORAGE" | "LOOP_DETECTED" | "BANDWIDTH_LIMIT_EXCEEDED" | "NOT_EXTENDED" | "NETWORK_AUTHENTICATION_REQUIRED";

export type SessionTrackingMode = "COOKIE" | "URL" | "SSL";

function uriEncoding(template: TemplateStringsArray, ...substitutions: any[]): string {
    let result = "";
    for (let i = 0; i < substitutions.length; i++) {
        result += template[i];
        result += encodeURIComponent(substitutions[i]);
    }
    result += template[template.length - 1];
    return result;
}
