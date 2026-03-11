using Saas.Domain.Entities;

namespace Saas.Application.Auth;

public interface IJwtProvider
{
    string GenerateToken(ApplicationUser user);
}
