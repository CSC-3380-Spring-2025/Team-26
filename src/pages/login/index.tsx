import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useUserAuth } from '@/context/userAuthContext';
import { UserLogIn } from '@/types';
import { Label } from '@radix-ui/react-label';
import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface ILoginProps {
}

const initialValue: UserLogIn = {
    email: "",
    password: "",
};

const Login: React.FunctionComponent<ILoginProps> = (props) => {

    const { googleSignIn, logIn } = useUserAuth();
    const navigate = useNavigate();
    const [userLogInInfo, setUserInfo] = React.useState<UserLogIn>(initialValue);
    const [error, setError] = React.useState<string>("");

    const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            console.log("The user info is : ", userLogInInfo);
            await logIn(userLogInInfo.email, userLogInInfo.password);
            navigate("/");
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    return <div className="bg-slate-800 w-full h-screen">
    <div className="container mx-auto p-6 flex h-full">
        <div className="flex justify-center items-center w-full">
            <div className="max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm">
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center mb-4">Diddy Finder</CardTitle>
                            <CardDescription>
                                Enter your email below to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {/* Google Sign-in Button */}
                            <div className="grid">
                                <Button variant="outline" onClick={handleGoogleSignIn}>
                                    <Icons.google className="mr-2 h-4 w-4" />
                                    Google
                                </Button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or
                                    </span>
                                </div>
                            </div>
                            {/* Email Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="dipesh@example.com"
                                    value={userLogInInfo.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setUserInfo({ ...userLogInInfo, email: e.target.value })
                                    }
                                />
                            </div>
                            {/* Password Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Social Security #</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={userLogInInfo.password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setUserInfo({ ...userLogInInfo, password: e.target.value })
                                    }
                                />
                            </div>
                            {/* Display Error if Passwords Do Not Match */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button className="w-full" type="submit">
                                Log In
                            </Button>
                            <p className="mt-3 text-sm text-center">
                                Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    </div>
</div>;
};

export default Login;