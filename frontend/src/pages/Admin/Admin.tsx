import {FC, useContext, useEffect, useState} from 'react'
import './Admin.scss'
import { LoginContext, InfoContext } from '../../components/App/App'
import { Button, Checkbox, Form, Input, Popconfirm, Skeleton, Space, Switch, Tabs, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, DotChartOutlined, FileAddOutlined, FormOutlined, InfoCircleOutlined, LockOutlined, MailOutlined, QuestionCircleOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { backendRequest, setLoginInfo } from '../../utils/backend'
import TextArea from 'antd/es/input/TextArea'
import MDEditor from '@uiw/react-md-editor'

type AdminProps = {
    setUsername:Function
}

export const Admin:FC<AdminProps> = ({setUsername}) => {
    const username = useContext(LoginContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(username === null) navigate('/login')
      }, [])

    const [blogpostValue, setBlogpostValue] = useState<string>(localStorage.getItem('blog-content') ?? `<h1>Blogtitel</h1>
    <p>Jegliches HTML-Markup wird unterstützt</p>
    <blockquote>Probier die verschiedenen Ansichten und Werkzeuge in der Toolbar aus!</blockquote>
    <h3>Bilder können über Links eingefügt werden (Für eigene Bilder einfach nach "image hosting" googlen</h3>
    <img src="https://images.saymedia-content.com/.image/t_share/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg"/>
        `)
    
    const [ownTitleImageToggle, setOwnTitleImageToggle] = useState<boolean>(false)
    const [ownImageUrl, setOwnImageUrl] = useState<string>('')
    const [addAdminLoading, setAddAdminLoading] = useState<boolean>(false)
    const [postBlogLoading, setPostBlogLoading] = useState<boolean>(false)
    const [usernameLoading, setUsernameLoading] = useState<boolean>(false)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [changePasswordLoading, setChangePasswordLoading] = useState<boolean>(false)
    const [usernameValue, setUsernameValue] = useState<string>(username ?? '')
    const [newUsernameValue, setNewUsernameValue] = useState<string>('')
    const setInfo = useContext(InfoContext)

    const confirmDeleteAccount = () => {
        setDeleteLoading(true)

        backendRequest('php/delete_account.php', {}).then((response) => {
            setLoginInfo('', '')
            location.reload()
        }).catch((reason) => {
            setInfo(reason.text, reason.status)
        }).finally(() => {
            setDeleteLoading(false)
        })
    }

    const cancelDeleteAccount = () => {
        setInfo('Puh, gerade nochmal gut gegangen', 'info')
    }

    const onSendPassword = (values:any) => {
        if (values['new-password'] !== values['repeat-password']) return setInfo('Passwords do not match!', 'warning')
        if (values['new-password'] === values['old-password']) return setInfo("You didn't change anything!", 'warning')

        setChangePasswordLoading(true)

        backendRequest('php/update_password.php', values).then((response) => {
            setInfo('Password changed successfully!', 'success')
        }).catch((reason) => {
            setInfo(reason.text, reason.status)
        }).finally(() => {
            setChangePasswordLoading(false)
        })
    }

    const onPostBlog = (values:any) => {
        if (blogpostValue === '') return setInfo('Blog content cannot be left empty!', 'warning')
        if (values['own-description'] === undefined || values['own-description'] === '') return setInfo('Blog description cannot be left empty!', 'warning')
        
        setPostBlogLoading(true)

        if (Object.hasOwn(values, 'own-image-url')) {
            const image = new Image();

            image.onload = function() {
                if (image.width > 0) {
                    continuePostBlog(values)
                } else {
                    setPostBlogLoading(false)
                    return setInfo('Image URL does not exist!', 'warning')
                }
            }

            image.onerror = function() {
                setPostBlogLoading(false)
                return setInfo('Image URL does not exist!', 'warning')
            }

            image.src = values['own-image-url']
        } else {
            continuePostBlog(values)
        }
    }

    const continuePostBlog = (values:any) => {        
        backendRequest('php/post_blog.php', {...values, content: blogpostValue}).then((response) => {
            setInfo(`Blog posted successfully! Visit it at www.gmundenspaceagency.org/blog/${response.text}`, 'success')
            localStorage.removeItem('blog-content')
            localStorage.removeItem('blog-description')
        }).catch((reason) => {
            setInfo(reason.text, reason.status)
        }).finally(() => {
            setPostBlogLoading(false)
        })
    }

    const onAddAdmin = (values:any) => {
        if (values['new-password'] !== values['repeat-password']) return setInfo('Passwords do not match!', 'warning')
        setAddAdminLoading(true)

        backendRequest('php/add_admin.php', values).then((response) => {
            setInfo('Admin added successfully!', 'success')
        }).catch((reason) => {
            setInfo(reason.text, reason.status)
        }).finally(() => {
            setAddAdminLoading(false)
        })
    }

    return (
        <>
            <main className='max-w-screen-md min-h-80 mx-auto' id='admin-panel'>
                <h1 className='text-2xl pt-7' style={{marginTop: '100px'}}>Admin Panel</h1>
                <Tabs
                    defaultActiveKey={localStorage.getItem('admin-panel-active-tab') ?? '1'}
                    className='pb-20'
                    onChange={(activeKey:string) => {
                        localStorage.setItem('admin-panel-active-tab', activeKey)
                    }}
                    items={[
                        {
                            key: '1',
                            label: `My account`,
                            children: <>
                                <Form
                                    initialValues={{ remember: true }}
                                    layout='vertical'
                                >
                                    <h2 className='mb-2'>Username</h2>
                                    <Form.Item>
                                        <Space direction='horizontal'>
                                            <Input
                                                count={{
                                                    show: true,
                                                    max: 6,
                                                    strategy: (txt) => txt.trim().length,
                                                    exceedFormatter: (txt, {max}) => txt.trim().slice(0, max),
                                                }}
                                                value={usernameValue}
                                                onChange={(e) => setUsernameValue(e.target?.value.trim().replaceAll(/[^a-zA-Z0-9_]/g, ''))}
                                                defaultValue={username ?? ''}
                                                prefix={<UserOutlined />}
                                                placeholder='username'
                                                status={usernameValue === '' ? 'error' : ''}
                                            />
                                            {username !== usernameValue && <>
                                                {usernameValue !== ''&& <Button
                                                    onClick={() => {
                                                        setUsernameLoading(true)

                                                        backendRequest('php/update_username.php', {new_username: usernameValue}).then((response) => {
                                                            setInfo('Username changed successfully!', 'success')
                                                       }).catch((reason) => {
                                                            setInfo(reason.text, reason.status)
                                                        }).finally(() => {
                                                            setUsernameLoading(false)
                                                            setUsername(usernameValue)
                                                        })
                                                    }}
                                                    loading={usernameLoading}
                                                >Save</Button>}
                                                <Button 
                                                    onClick={() => {
                                                        setUsernameValue(username ?? '')
                                                    }}
                                                    danger
                                                >Cancel</Button>
                                            </>}
                                        </Space>
                                    </Form.Item>
                                </Form>

                                <h2 className='mt-10'>Password</h2>
                                <Form
                                    initialValues={{ remember: true }}
                                    onFinish={onSendPassword}
                                    layout='vertical'
                                >
                                    <Space direction='vertical'>
                                        <Form.Item
                                            label="Old password"
                                            name="old-password"
                                            rules={[{ required: true, message: 'Please input your old password!' }]}
                                        >
                                            <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                        </Form.Item>

                                        <Space direction='horizontal'>
                                            <Form.Item
                                                label="New password"
                                                name="new-password"
                                                rules={[{ required: true, message: 'Please input your new password!' }]}
                                            >
                                                <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                            </Form.Item>
                                            <Form.Item
                                                label="Repeat new password"
                                                name="repeat-password"
                                                rules={[{ required: true, message: 'Please repeat your new password!' }]}
                                            >
                                                <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                            </Form.Item>
                                        </Space>
                                        <Form.Item>
                                            <Button htmlType="submit" className='-mt-2' loading={changePasswordLoading}>
                                                Change
                                            </Button>
                                        </Form.Item>
                                    </Space>
                                </Form>
                                
                                <h2 className='mt-3'>Danger Zone</h2>
                                <div className='flex flex-wrap gap-5 mt-2'>
                                    <Button onClick={() => {setLoginInfo('', ''); location.reload()}}danger>Logout</Button>
                                    <Popconfirm
                                        title="Delete your account"
                                        description={<span>Are you sure you want to delete your account? <br /> This action is <b>irreversible</b></span>}
                                        onConfirm={confirmDeleteAccount}
                                        onCancel={cancelDeleteAccount}
                                        icon={<QuestionCircleOutlined />}
                                        okButtonProps={{danger: true, loading: deleteLoading}}
                                        okText="Yes"
                                        cancelText="Cancel"
                                    >
                                        <Button type='primary' danger loading={deleteLoading}>Delete Account</Button>
                                    </Popconfirm>
                                </div>
                            </>,
                            icon: <FormOutlined />
                        },
                        {
                            key: '2',
                            label: `Create Blogpost`,
                            children: <>
                                <Form
                                    initialValues={{remember: true, 'own-description': localStorage.getItem('blog-description') ?? ''}}
                                    onFinish={onPostBlog}
                                >
                                    <Form.Item>
                                        <MDEditor
                                            value={blogpostValue}
                                            onChange={(value) => {
                                                setBlogpostValue(value ?? '')
                                                if (value && value.trim() !== '') localStorage.setItem('blog-content', value)
                                                else localStorage.removeItem('blog-content')
                                            }}
                                            height='30em'
                                        />
                                    </Form.Item>
                                    <Form.Item name='own-description'>
                                        <TextArea
                                            showCount
                                            maxLength={150}
                                            placeholder="Gib hier die Kurzbeschreibung ein, die in der Blog-Preview sichtbar sein wird."
                                            autoSize={{ minRows: 2, maxRows: 6 }}
                                            onChange={(el) => localStorage.setItem('blog-description', el.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Space direction='horizontal'>
                                            <span className='light-font'>Eigenes Titelbild wählen (URL)</span>
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                value={ownTitleImageToggle}
                                                onChange={setOwnTitleImageToggle}
                                                defaultChecked
                                            />
                                        </Space>
                                    </Form.Item>
                                    {ownTitleImageToggle && <>
                                        <Form.Item name='own-image-url'>
                                            <Input 
                                                value={ownImageUrl}
                                                onChange={(e) => setOwnImageUrl(e.target?.value)}
                                                placeholder='https://www.meinbild.at'
                                                suffix={
                                                    <Tooltip title="Nutze für eigene Bilder einen Image-Hosting Service wie https://imgbb.com/ oder nimm einfach Bilder unter öffentlicher Lizenz">
                                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                                    </Tooltip>
                                                }
                                            />
                                        </Form.Item>
                                        <img src={ownImageUrl} className='w-1/2 rounded-xl' alt="Bild nicht gefunden"/>
                                    </>}
                                    <Form.Item>
                                        <Button className='mt-10' htmlType='submit' loading={postBlogLoading}>Blog posten</Button>
                                    </Form.Item>
                                </Form>
                            </>,
                            icon: <FileAddOutlined />,
                        },
                        {
                            key: '3',
                            label: `Add admin`,
                            children: <>
                                <Form
                                    initialValues={{ remember: true }}
                                    onFinish={onAddAdmin}
                                    layout='vertical'
                                >
                                <Space direction='vertical'>
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input the username!' }]}
                                        hasFeedback
                                    >
                                        <Input
                                            count={{
                                                show: true,
                                                max: 6,
                                                strategy: (txt) => txt.trim().length,
                                                exceedFormatter: (txt, {max}) => txt.trim().slice(0, max),
                                            }}
                                            value={newUsernameValue}
                                            onChange={(e) => setNewUsernameValue(e.target?.value.trim().replaceAll(/[^a-zA-Z0-9_]/g, ''))}
                                            prefix={<UserOutlined />}
                                            placeholder='username'
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                              required: true,
                                              type: "email",
                                              message: "This is not not a valid email!",
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input
                                            prefix={<MailOutlined />}
                                            placeholder='john@cena.xyz'
                                        />
                                    </Form.Item>

                                    <Space direction='horizontal'>
                                        <Form.Item
                                            label="Password"
                                            name="new-password"
                                            rules={[{ required: true, message: 'Please input a password!' }]}
                                        >
                                            <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Repeat password"
                                            name="repeat-password"
                                            rules={[{ required: true, message: 'Please repeat the password!' }]}
                                        >
                                            <Input.Password placeholder='password123' prefix={<LockOutlined />}/>
                                        </Form.Item>
                                    </Space>

                                    <Form.Item>
                                    <Button htmlType="submit" loading={addAdminLoading}>
                                        Add admin
                                    </Button>
                                    </Form.Item>
                                </Space>
                                </Form>
                            </>,
                            icon: <UserAddOutlined />,
                        },
                    ]}
                />
            </main>
        </>
    )
}
