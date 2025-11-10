import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import useRegistered from '@/hooks/protection/useRegistered';
import JoinTeam from './join';
import CreateTeam from './create';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const JoinOrCreateTeamPage = () => {
    const { session } = useRegistered();

    return (
        <Card className="w-4/5 md:w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Join or Create a team</CardTitle>
                <CardDescription>
                    You need to be part of a team to continue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="join">
                    <TabsList>
                        <TabsTrigger value="join">Join</TabsTrigger>
                        <TabsTrigger value="create">Create</TabsTrigger>
                    </TabsList>
                    <TabsContent value="join">
                        <JoinTeam session={session} />
                    </TabsContent>
                    <TabsContent value="create">
                        <CreateTeam session={session} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default JoinOrCreateTeamPage;
