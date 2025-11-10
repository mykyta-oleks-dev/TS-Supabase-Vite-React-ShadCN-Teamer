import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import useRegistered from '@/hooks/protection/useRegistered';
import JoinTeam from './join';

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
                <JoinTeam session={session} />
            </CardContent>
        </Card>
    );
};

export default JoinOrCreateTeamPage;
